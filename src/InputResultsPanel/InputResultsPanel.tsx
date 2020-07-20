import React, { useEffect } from 'react';
import styles from './InputResultsPanel.module.css';

type props = {
  onResultsUrlChanged: (newUrl: string) => void,
};

function InputResultsPanel(props: props) {
  function onChange(evt: any) {
    props.onResultsUrlChanged(evt.target.value);
  }

  useEffect(() => {
    props.onResultsUrlChanged('http://localhost:4000/results');
  }, []);

  return (
    <div className={styles.container}><input className={styles.input} onChange={onChange} /></div>
  );
}

export default InputResultsPanel;
