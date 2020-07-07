import React from 'react';

type props = {
  onFunctionParametersChanged: (newParameters: any) => void,
}

function WeightFunctionBuilder(props: props) {
  return (
    <form>
      <input onChange={(evt) => props.onFunctionParametersChanged(evt.target.value)}></input>
    </form>
  );
}

export default WeightFunctionBuilder;
