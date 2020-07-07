import React, { useState } from 'react';
import ScoringFunctionType from 'ScoringFunctionType';
import RandomScoreFunctionBuilder from "../RandomScoreFunctionBuilder/RandomScoreFunctionBuilder";
import WeightFunctionBuilder from "../WeightFunctionBuilder/WeightFunctionBuilder";

type props = {
  onFunctionConfigured: (newFunctionType: ScoringFunctionType, newFunctionParams: any) => void,
}

function FunctionTypeSelector(props: props) {
  const [newFunctionType, setNewFunctionType] = useState<ScoringFunctionType>(ScoringFunctionType.Weight);
  const [newFunctionParams, setNewFunctionParams] = useState();

  return (
    <div>
    <select
      value={newFunctionType}
      onChange={(evt) => setNewFunctionType(evt.target.value as ScoringFunctionType)}
    >
      {Object.values(ScoringFunctionType).map(value => <option key={value} value={value}>{value}</option>)}
    </select>
    {newFunctionType === ScoringFunctionType.RandomScore && (
      <RandomScoreFunctionBuilder></RandomScoreFunctionBuilder>
    )}
    {newFunctionType === ScoringFunctionType.Weight && (
      <WeightFunctionBuilder
        onFunctionParametersChanged={setNewFunctionParams}
      ></WeightFunctionBuilder>
    )}
    <button onClick={() => props.onFunctionConfigured(newFunctionType, newFunctionParams)}>+</button>
    </div>
  );
}

export default FunctionTypeSelector;
