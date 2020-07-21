import ScoreMode from 'ScoreMode';
import BoostMode from 'BoostMode';

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
