export enum Modifier {
  None = 'none',
  Log = 'log',
  LogOneP = 'log1p',
  LogTwoP = 'log2p',
  LN = 'ln',
  LNOneP = 'ln1p',
  LNTwoP = 'ln2p',
  Square = 'square',
  Sqrt = 'sqrt',
  Reciprocal = 'reciprocal',
}

export interface FieldValueFactorDef {
  field: string;
  factor: number;
  modifier: Modifier;
  missing: number;
}
