import React from 'react';
import styles from './OutputResultsPanel.module.css';
import SearchResult from 'SearchResult';
import ScoreSet from 'ScoreSet';

type props = {
  results: SearchResult[],
  scoreSet: ScoreSet,
};

function OutputResultsPanel(props: props) {
  function compare(a: SearchResult, b: SearchResult) {
    return props.scoreSet[b.id] - props.scoreSet[a.id];
  }

  const results: SearchResult[] = Array.from(props.results).sort(compare);

  return (
    <div className={styles.container}>
      {results.map((result) => (
        <div className={styles.result} key={result.id}>
          <span className={styles.score}>{props.scoreSet[result.id]} (+ {props.scoreSet[result.id] - result.score})</span>
          <pre>{JSON.stringify(result.source, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}

export default OutputResultsPanel;
