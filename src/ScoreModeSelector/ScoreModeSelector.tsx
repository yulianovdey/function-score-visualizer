import React from 'react';
import ScoreMode from 'ScoreMode';

function ScoreModeSelector(props: { onScoreModeChanged: (newMode: string) => void }) {
  return (
    <select onChange={(evt) => props.onScoreModeChanged(evt.target.value)}>
      {Object.values(ScoreMode).map(value => <option key={value} value={value}>{value}</option>)}
    </select>
  );
}

export default ScoreModeSelector;
