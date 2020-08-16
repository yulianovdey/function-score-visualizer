import React, { useEffect, useRef, useState } from 'react';
import ScoreMode from 'ScoreMode';
import SearchResult from 'SearchResult';
import ScoreSet from 'ScoreSet';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import { get } from 'lodash';
import BoostMode from 'BoostMode';
import { combineScores, boostScore, modifyFieldValueScore } from './Scoring';
import { FieldValueFactorDef } from 'FieldValueFactor';

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

interface ScoringFunction {
  calculateScore(result: SearchResult): number;
}

const DEFAULT = {
  function_score: {
    functions: [
      {
        random_score: {},
      },
      {
        random_score: {},
      },
    ],
    score_mode: 'multiply',
    boost_mode: 'multiply',
  }
};

interface FunctionDefinition {
  instance: ScoringFunction,
}

type props = {
  results: SearchResult[],
  onScoresUpdated: (scoreSet: ScoreSet) => void,
};

function FunctionScorePanel(props: props) {
  const [functionDefinitions, setFunctionDefinitions] = useState<FunctionDefinition[]>([]);
  const [scoreMode, setScoreMode] = useState(ScoreMode.Multiply);
  const [boostMode, setBoostMode] = useState(BoostMode.Multiply);
  const [versioning, setVersioning] = useState({
    functions: 1,
    scoreSet: 1,
  })

  function recalculateScores() {
    const set: ScoreSet = {};

    props.results.forEach((result) => {
      const scores: number[] = [];
      functionDefinitions.forEach((functionDefinition) => {
        scores.push(functionDefinition.instance.calculateScore(result));
      });

      const boost = combineScores(scores, scoreMode);

      set[result.id] = boostScore(result.score, boost, boostMode);
    });

    props.onScoresUpdated(set);

    setVersioning(prev => Object.assign({}, prev, { scoreSet: prev.functions }));
  }

  const editorContainer = useRef(null);
  const editor = useRef<CodeMirror.Editor>();
  const updateInterval = useRef<any>();

  useEffect(() => {
    if (editor.current) {
      return;
    }

    editor.current = CodeMirror(editorContainer.current!, {
      value: JSON.stringify(DEFAULT, null, 4),
      mode: 'javascript',
      smartIndent: true,
      autoCloseBrackets: true,
      indentUnit: 4,
      viewportMargin: Infinity,
    });

    editor.current.on('change', (instance) => {
      let value;
      try {
        value = JSON.parse(instance.getValue()).function_score;
      } catch {}

      if (!value) {
        return;
      }

      if (value.score_mode !== scoreMode) {
        setScoreMode(value.score_mode);
      }

      if (value.boost_mode !== boostMode) {
        setBoostMode(value.boost_mode);
      }

      const defs: FunctionDefinition[] = [];

      value.functions.forEach((definition: any) => {
        if (definition.hasOwnProperty('random_score')) {
          defs.push({
            instance: {
              calculateScore(): number {
                return randomInt(0, 10);
              }
            }
          })
        } else if (definition.hasOwnProperty('weight')) {
          defs.push({
            instance: {
              calculateScore(result): number {
                return result.score * definition.weight;
              }
            },
          })
        } else if (definition.hasOwnProperty('field_value_factor')) {
          defs.push({
            instance: {
              calculateScore(result: SearchResult): number {
                const config: FieldValueFactorDef = definition['field_value_factor'];

                let field: number = get(result.source, config.field);

                if (typeof config.factor !== 'undefined') {
                  field *= config.factor;
                }

                return modifyFieldValueScore(field, config.modifier);
              }
            },
          })
        }
      });

      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }

      updateInterval.current = setTimeout(() => {
        setFunctionDefinitions(defs);

        setVersioning(prev => Object.assign({}, prev, { functions: prev.functions + 1 }));
      }, 200);
    });
  });

  useEffect(() => {
    if (versioning.functions !== versioning.scoreSet) {
      recalculateScores();
    }
  });

  return <div className="editor" ref={editorContainer}></div>;
}

export default FunctionScorePanel;
