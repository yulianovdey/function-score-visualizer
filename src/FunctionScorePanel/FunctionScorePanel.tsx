import React, { useState } from 'react';
import ScoreModeSelector from 'ScoreModeSelector/ScoreModeSelector';
import ScoreMode from 'ScoreMode';
import SearchResult from 'SearchResult';
import FunctionTypeSelector from 'FunctionTypeSelector/FunctionTypeSelector';
import ScoringFunctionType from "../ScoringFunctionType";

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

interface ScoringFunction {
  calculateScore(results: SearchResult[]): number;
}

interface WeightFunction extends ScoringFunction {
  weight: number
}

interface RandomScoreFunction extends ScoringFunction {

}

function FunctionScoreDefinitionFactory(scoreMode: ScoreMode) {
  return { scoreMode };
}

const result = FunctionScoreDefinitionFactory(ScoreMode.Average);

interface FunctionDefinition {
  instance: ScoringFunction,
}

function FunctionScorePanel() {
  const [functionDefinitions, setFunctionDefinitions] = useState<FunctionDefinition[]>([]);

  function onScoreModeChanged(newMode: string) {
    let score = 0;

    const results = [
      { score: randomInt(1, 100) },
      { score: randomInt(1, 100) },
      { score: randomInt(1, 100) },
      { score: randomInt(1, 100) },
    ];

    const scores = functionDefinitions.map(functionDefinition => functionDefinition.instance.calculateScore(results));

    if (newMode === ScoreMode.Max) {
      score = Math.max(...scores);
    } else if (newMode === ScoreMode.Min) {
      score = Math.min(...scores);
    } else if (newMode === ScoreMode.First) {
      score = scores[0];
    } else if (newMode === ScoreMode.Sum) {
      score = scores.reduce((a, b) => a + b);
    } else if (newMode === ScoreMode.Multiply) {
      score = scores.reduce((a, b) => a * b);
    } else if (newMode === ScoreMode.Average) {
      score = Math.floor(scores.reduce((a, b) => a + b) / scores.length);
    }

    console.log(score);
  }

  function onFunctionConfigured(newType: string, newParams: any) {
    if (newType === ScoringFunctionType.RandomScore) {
      setFunctionDefinitions(functionDefinitions.concat({
        instance: {
          calculateScore(): number {
            return randomInt(0, 10);
          }
        }
      }))
    }
  }

  return (
    <div>
      <div>Function Score Panel</div>
      {functionDefinitions.map((_, index) => <div key={index}>this is a definition</div>)}
      <div>Score Mode:</div>
      <ScoreModeSelector onScoreModeChanged={onScoreModeChanged}></ScoreModeSelector>
      <div>New Function:</div>
      <FunctionTypeSelector
        onFunctionConfigured={onFunctionConfigured}
      ></FunctionTypeSelector>
    </div>
  );
}

export default FunctionScorePanel;
