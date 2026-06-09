import { iqQuestions, mbtiQuestions, mbtiTypes, iqInterpretation, difficultyPoints } from '../data';

const IQ_MEAN = 100;
const IQ_SD = 15;

function calculateIQ(answers, questions, timeSpentSeconds) {
  const qs = questions || iqQuestions;
  let weightedScore = 0;
  let maxWeightedScore = 0;
  const categoryScores = {};

  qs.forEach((q) => {
    const points = difficultyPoints[q.difficulty] || 1;
    maxWeightedScore += points;

    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category].total += points;

    if (answers[q.id] === q.correct) {
      weightedScore += points;
      categoryScores[q.category].correct += points;
    }
  });

  const rawPercentage = maxWeightedScore > 0 ? weightedScore / maxWeightedScore : 0;
  const iqScore = Math.round(rawPercentage * 75 + 70);
  const clampedIQ = Math.max(50, Math.min(160, iqScore));
  const percentile = computePercentile(clampedIQ);
  const interpretation = getIQInterpretation(clampedIQ);
  const categoryBreakdown = Object.entries(categoryScores).map(([name, { correct, total }]) => ({
    name,
    score: total > 0 ? Math.round((correct / total) * 100) : 0,
    correct,
    total
  }));

  return {
    score: clampedIQ,
    rawScore: weightedScore,
    maxScore: maxWeightedScore,
    percentile,
    interpretation,
    categoryBreakdown,
    timeSpentSeconds,
    label: interpretation.label,
    color: interpretation.color
  };
}

function computePercentile(iqScore) {
  const z = (iqScore - IQ_MEAN) / IQ_SD;
  const percentile = 0.5 * (1 + erf(z / Math.SQRT2));
  return Math.round(percentile * 10000) / 100;
}

function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function getIQInterpretation(iqScore) {
  const levels = Object.values(iqInterpretation).sort((a, b) => b.min - a.min);
  for (const level of levels) {
    if (iqScore >= level.min) return level;
  }
  return iqInterpretation.developing;
}

function calculateMBTI(answers, questions) {
  const qs = questions || mbtiQuestions;
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  qs.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined || answer === null) return;

    const poleA = q.trait[0];
    const poleB = q.trait[1];

    if (q.direction === 1) {
      if (answer === 0) { scores[poleA] += 1; counts[poleA] += 1; }
      else { scores[poleB] += 1; counts[poleB] += 1; }
    } else {
      if (answer === 0) { scores[poleB] += 1; counts[poleB] += 1; }
      else { scores[poleA] += 1; counts[poleA] += 1; }
    }
  });

  const ei = scores.E >= scores.I ? 'E' : 'I';
  const sn = scores.S >= scores.N ? 'S' : 'N';
  const tf = scores.T >= scores.F ? 'T' : 'F';
  const jp = scores.J >= scores.P ? 'J' : 'P';

  const typeCode = ei + sn + tf + jp;
  const typeInfo = mbtiTypes[typeCode] || {
    label: `${typeCode} — Your Unique Type`,
    description: "Your personality type reflects a unique combination of preferences.",
    strengths: ["Self-awareness", "Adaptability"],
    weaknesses: [],
    careers: []
  };

  const dimensions = [
    {
      code: 'EI',
      label: 'Extraversion vs Introversion',
      dominant: ei,
      recessive: ei === 'E' ? 'I' : 'E',
      dominantScore: Math.round((scores[ei] / Math.max(counts[ei], 1)) * 100),
      recessiveScore: Math.round((scores[ei === 'E' ? 'I' : 'E'] / Math.max(counts[ei === 'E' ? 'I' : 'E'], 1)) * 100),
      description: ei === 'E'
        ? 'You draw energy from social interaction and external activity.'
        : 'You draw energy from solitude, reflection, and inner thoughts.'
    },
    {
      code: 'SN',
      label: 'Sensing vs Intuition',
      dominant: sn,
      recessive: sn === 'S' ? 'N' : 'S',
      dominantScore: Math.round((scores[sn] / Math.max(counts[sn], 1)) * 100),
      recessiveScore: Math.round((scores[sn === 'S' ? 'N' : 'S'] / Math.max(counts[sn === 'S' ? 'N' : 'S'], 1)) * 100),
      description: sn === 'S'
        ? 'You focus on concrete facts, details, and present realities.'
        : 'You focus on patterns, possibilities, and future implications.'
    },
    {
      code: 'TF',
      label: 'Thinking vs Feeling',
      dominant: tf,
      recessive: tf === 'T' ? 'F' : 'T',
      dominantScore: Math.round((scores[tf] / Math.max(counts[tf], 1)) * 100),
      recessiveScore: Math.round((scores[tf === 'T' ? 'F' : 'T'] / Math.max(counts[tf === 'T' ? 'F' : 'T'], 1)) * 100),
      description: tf === 'T'
        ? 'You make decisions based on logic, consistency, and objective analysis.'
        : 'You make decisions based on values, empathy, and harmony.'
    },
    {
      code: 'JP',
      label: 'Judging vs Perceiving',
      dominant: jp,
      recessive: jp === 'J' ? 'P' : 'J',
      dominantScore: Math.round((scores[jp] / Math.max(counts[jp], 1)) * 100),
      recessiveScore: Math.round((scores[jp === 'J' ? 'P' : 'J'] / Math.max(counts[jp === 'J' ? 'P' : 'J'], 1)) * 100),
      description: jp === 'J'
        ? 'You prefer structure, planning, and decided outcomes.'
        : 'You prefer flexibility, spontaneity, and keeping options open.'
    }
  ];

  return { typeCode, typeInfo, dimensions, scores };
}

export { calculateIQ, calculateMBTI, getIQInterpretation, computePercentile };
