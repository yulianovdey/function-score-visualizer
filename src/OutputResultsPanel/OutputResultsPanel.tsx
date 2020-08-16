import React, { Fragment } from 'react';
import styles from './OutputResultsPanel.module.css';
import SearchResult from 'SearchResult';
import ScoreSet from 'ScoreSet';

type props = {
  results: SearchResult[],
  scoreSet: ScoreSet,
};

function ScoreDifference(props: { a: number, b: number }) {
  const difference = Math.abs(props.a - props.b);
  const sign = props.b < props.a ? '-' : '+';

  return <Fragment>{sign} {difference}</Fragment>
}

function OutputResultsPanel(props: props) {
  function compare(a: SearchResult, b: SearchResult) {
    return props.scoreSet[b.id] - props.scoreSet[a.id];
  }

  const results: SearchResult[] = Array.from(props.results).sort(compare);

  return (
    <div className={styles.container}>
      {results.map((result) => (
        <div className={styles.result} key={result.id}>
          <span className={styles.score}>{props.scoreSet[result.id]} (<ScoreDifference a={result.score} b={props.scoreSet[result.id]} />)</span>
          <pre>{JSON.stringify(result.source, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}

export default OutputResultsPanel;
