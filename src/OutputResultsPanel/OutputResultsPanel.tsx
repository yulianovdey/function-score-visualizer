import React from 'react';
import styles from './OutputResultsPanel.module.css';
import SearchResult from 'SearchResult';
import ScoreSet from 'ScoreSet';

type props = {
  results: SearchResult[],
  scoreSet: ScoreSet,
};

function OutputResultsPanel(props: props) {
  function qualifiedScore(result: SearchResult) {
    if (props.scoreSet[result.id]) {
      return result.score + props.scoreSet[result.id];
    }

    return result.score;
  }

  function compare(a: SearchResult, b: SearchResult) {
    return qualifiedScore(b) - qualifiedScore(a);
  }

  const results: SearchResult[] = Array.from(props.results).sort(compare);

  return (
    <div className={styles.container}>
      {results.map((result) => (
        <div className={styles.result} key={result.id}>
          <span className={styles.score}>{qualifiedScore(result)} ({result.score}+ {props.scoreSet[result.id]})</span>
          <pre>{JSON.stringify(result.source, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}

export default OutputResultsPanel;
