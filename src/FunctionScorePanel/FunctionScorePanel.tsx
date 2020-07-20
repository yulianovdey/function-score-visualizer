import React, { useEffect, useRef, useState } from 'react';
import ScoreMode from 'ScoreMode';
import SearchResult from 'SearchResult';
import ScoreSet from 'ScoreSet';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';

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
      {
        weight: 2,
      },
    ],
    score_mode: 'max',
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
  const [versioning, setVersioning] = useState({
    functions: 1,
    scoreSet: 1,
  })

  function combineScores(scores: number[]): number {
    if (!scores.length) {
      return 0;
    }

    if (scoreMode === ScoreMode.Max) {
      return Math.max(...scores);
    }

    if (scoreMode === ScoreMode.Min) {
      return Math.min(...scores);
    }

    if (scoreMode === ScoreMode.First) {
      return scores[0];
    }

    if (scoreMode === ScoreMode.Sum) {
      return scores.reduce((a, b) => a + b, 0);
    }

    if (scoreMode === ScoreMode.Multiply) {
      return scores.reduce((a, b) => a * b);
    }

    if (scoreMode === ScoreMode.Average) {
      return Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
    }

    return 0;
  }

  function recalculateScores() {
    const set: ScoreSet = {};

    props.results.forEach((result) => {
      const scores: number[] = [];
      functionDefinitions.forEach((functionDefinition) => {
        scores.push(functionDefinition.instance.calculateScore(result));
      });


      set[result.id] = result.score + combineScores(scores);
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

      if (scoreMode !== value.score_mode) {
        setScoreMode(value.score_mode);
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
