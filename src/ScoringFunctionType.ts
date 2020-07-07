enum ScoringFunctionType {
  ScriptScore = 'script_score',
  Weight = 'weight',
  RandomScore = 'random_score',
  FieldValueFactor = 'field_value_factor',
  Gaussian = 'gauss',
  Linear = 'linear',
  Exponential = 'exponential',
}

export default ScoringFunctionType;
