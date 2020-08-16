import ScoreMode from 'ScoreMode';
import BoostMode from 'BoostMode';
import { Modifier } from 'FieldValueFactor';

export function combineScores(scores: number[], mode: ScoreMode): number {
  if (!scores.length) {
    return 1;
  }

  switch (mode) {
    case ScoreMode.Multiply:
      return scores.reduce((a, b) => a * b);

    case ScoreMode.Sum:
      return scores.reduce((a, b) => a + b, 0);

    case ScoreMode.Average:
      return scores.reduce((a, b) => a + b, 0) / scores.length;

    case ScoreMode.First:
      return scores[0];

    case ScoreMode.Max:
      return Math.max(...scores);

    case ScoreMode.Min:
      return Math.min(...scores);
  }
}

export function boostScore(score: number, boost: number, mode: BoostMode) {
  switch (mode) {
    case BoostMode.Multiply:
      return score * boost;

    case BoostMode.Replace:
      return boost;

    case BoostMode.Sum:
      return score + boost;

    case BoostMode.Average:
      return (score + boost) / 2;

    case BoostMode.Max:
      return Math.max(score, boost);

    case BoostMode.Min:
      return Math.min(score, boost);
  }
}

export function modifyFieldValueScore(field: number, modifier: Modifier) {
  if (modifier === Modifier.Log) {
    return Math.log10(field);
  }

  if (modifier === Modifier.LogOneP) {
    return Math.log10(1 + field);
  }

  if (modifier === Modifier.LogTwoP) {
    return Math.log10(2 + field);
  }

  if (modifier === Modifier.LN) {
    return Math.log(field);
  }

  if (modifier === Modifier.LNOneP) {
    return Math.log1p(field);
  }

  if (modifier === Modifier.LNTwoP) {
    return Math.log(2 + field);
  }

  if (modifier === Modifier.Square) {
    return Math.pow(field, 2);
  }

  if (modifier === Modifier.Sqrt) {
    return Math.sqrt(field);
  }

  if (modifier === Modifier.Reciprocal) {
    return 1 / field;
  }

  return field;
}
