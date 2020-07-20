import React from 'react';
import ScoreMode from 'ScoreMode';

function ScoreModeSelector(props: { onScoreModeChanged: (newMode: ScoreMode) => void }) {
  function mapValueToMode(value: string): ScoreMode {
    switch (value) {
      case 'multiply':
        return ScoreMode.Multiply;
      case 'sum':
        return ScoreMode.Sum;
      case 'avg':
        return ScoreMode.Average;
      case 'first':
        return ScoreMode.First;
      case 'max':
        return ScoreMode.Max;
      case 'min':
        return ScoreMode.Min;
    }

    throw new Error(`Could not map value ${value} to score mode.`);
  }

  return (
    <select onChange={evt => props.onScoreModeChanged(mapValueToMode(evt.target.value))}>
      {Object.values(ScoreMode).map(value => <option key={value} value={value}>{value}</option>)}
    </select>
  );
}

export default ScoreModeSelector;
