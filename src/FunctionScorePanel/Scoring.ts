import ScoreMode from 'ScoreMode';

export function combineScores(scores: number[], mode: ScoreMode): number {
  if (!scores.length) {
    return 1;
  }

  switch (mode) {
    case ScoreMode.Max:
      return Math.max(...scores);

    case ScoreMode.Min:
      return Math.min(...scores);

    case ScoreMode.First:
      return scores[0];

    case ScoreMode.Sum:
      return scores.reduce((a, b) => a + b, 0);

    case ScoreMode.Multiply:
      return scores.reduce((a, b) => a * b);

    case ScoreMode.Average:
      return Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);

    default:
      return 1
  }
}
