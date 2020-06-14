import React, { useState } from 'react';
import ScoreModeSelector from '../ScoreModeSelector/ScoreModeSelector';
import ScoreMode from 'ScoreMode';
import SearchResult from 'SearchResult';

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

interface FunctionType {
  calculateScore(results: SearchResult[]): number;
}

interface WeightFunction extends FunctionType {
  weight: number
}

interface RandomScoreFunction extends FunctionType {

}

function RandomScoreFunctionFactory(): RandomScoreFunction {
  return {
    calculateScore() {
      return randomInt(1, 100);
    }
  };
}

function WeightFunctionFactory(weight: number): WeightFunction {
  return {
    weight,
    calculateScore() {
      return this.weight;
    }
  };
}

function FunctionScoreDefinitionFactory(scoreMode: ScoreMode) {
  return { scoreMode };
}

const result = FunctionScoreDefinitionFactory(ScoreMode.Average);

console.log(result.scoreMode);

interface FunctionDefinition {
  name: string,
  instance: FunctionType,
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

  return (
    <div>
      Function Score Panel
      {functionDefinitions.map((_, index) => <div key={index}>this is a definition</div>)}
      <ScoreModeSelector onScoreModeChanged={onScoreModeChanged}></ScoreModeSelector>
      <button onClick={() => setFunctionDefinitions(functionDefinitions.concat({ name: 'weight', instance: WeightFunctionFactory(randomInt(1, 100))}))}>Add Weight Function</button>
      <button onClick={() => setFunctionDefinitions(functionDefinitions.concat({ name: 'random', instance: RandomScoreFunctionFactory()}))}>Add Random Function</button>
    </div>
  );
}

export default FunctionScorePanel;
