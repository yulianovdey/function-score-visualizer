import React, { useState } from 'react';
import styles from './App.module.css';
import ScoreSet from 'ScoreSet';
import SearchResult from './SearchResult';
import InputResultsPanel from './InputResultsPanel/InputResultsPanel';
import FunctionScorePanel from 'FunctionScorePanel/FunctionScorePanel';
import OutputResultsPanel from './OutputResultsPanel/OutputResultsPanel';

function App() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [scoreSet, setScoreSet] = useState<ScoreSet>({});

  async function onResultsUrlChanged(url: string) {
    let res;
    try {
      new URL(url);
      res = await fetch(url);
    } catch {}

    if (!res) {
      return;
    }

    const results: any[] = await res.json();

    setResults(results.map(({ _id, _score, _source }) => ({ id: _id, score: _score, source: _source })));
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputResultsPanel}>
        <InputResultsPanel onResultsUrlChanged={onResultsUrlChanged}></InputResultsPanel>
      </div>
      <div className={styles.grid}>
        <div className={styles.column}>
          <FunctionScorePanel results={results} onScoresUpdated={setScoreSet}></FunctionScorePanel>
        </div>
        <div className={styles.column}>
          <OutputResultsPanel results={results} scoreSet={scoreSet}></OutputResultsPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
