import React from 'react';
import './App.css';
import SearchResultsPanel from 'SearchResultsPanel/SearchResultsPanel';
import FunctionScorePanel from 'FunctionScorePanel/FunctionScorePanel';
import SortedResultsPanel from 'SortedResultsPanel/SortedResultsPanel';

function App() {
  return (
    <div className="App">
      <SearchResultsPanel></SearchResultsPanel>
      <FunctionScorePanel></FunctionScorePanel>
      <SortedResultsPanel></SortedResultsPanel>
    </div>
  );
}

export default App;
