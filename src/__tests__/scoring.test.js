import { calculateIQ, calculateMBTI, computePercentile, getIQInterpretation } from '../utils/scoring';
import { iqQuestions, mbtiQuestions } from '../data';

describe('computePercentile', () => {
  test('returns 50 for average IQ of 100', () => {
    expect(computePercentile(100)).toBeCloseTo(50, 0);
  });

  test('returns ~97.7 for IQ of 130', () => {
    const pct = computePercentile(130);
    expect(pct).toBeGreaterThan(97);
    expect(pct).toBeLessThan(99);
  });

  test('returns ~2.3 for IQ of 70', () => {
    const pct = computePercentile(70);
    expect(pct).toBeGreaterThan(1);
    expect(pct).toBeLessThan(4);
  });
});

describe('getIQInterpretation', () => {
  test('returns Genius for 130+', () => {
    expect(getIQInterpretation(130).label).toBe('Genius');
  });

  test('returns Average for 90-109', () => {
    expect(getIQInterpretation(100).label).toBe('Average');
  });

  test('returns Developing for very low scores', () => {
    expect(getIQInterpretation(40).label).toBe('Developing');
  });
});

describe('calculateIQ', () => {
  test('all correct answers give a high score', () => {
    const allCorrect = {};
    iqQuestions.forEach((q) => { allCorrect[q.id] = q.correct; });
    const result = calculateIQ(allCorrect);
    expect(result.score).toBeGreaterThan(130);
    expect(result.rawScore).toBe(result.maxScore);
  });

  test('all wrong answers give a low score', () => {
    const allWrong = {};
    iqQuestions.forEach((q) => { allWrong[q.id] = q.correct === 0 ? 1 : 0; });
    const result = calculateIQ(allWrong);
    expect(result.score).toBeLessThan(80);
    expect(result.rawScore).toBe(0);
  });

  test('accepts custom question set', () => {
    const customQs = [iqQuestions[0]];
    const answers = { [customQs[0].id]: customQs[0].correct };
    const result = calculateIQ(answers, customQs);
    expect(result.score).toBeGreaterThan(70);
    expect(result.maxScore).toBeGreaterThan(0);
  });

  test('returns category breakdown', () => {
    const allCorrect = {};
    iqQuestions.forEach((q) => { allCorrect[q.id] = q.correct; });
    const result = calculateIQ(allCorrect);
    expect(result.categoryBreakdown.length).toBeGreaterThan(0);
  });

  test('returns time when provided', () => {
    const allCorrect = {};
    iqQuestions.forEach((q) => { allCorrect[q.id] = q.correct; });
    const result = calculateIQ(allCorrect, null, 300);
    expect(result.timeSpentSeconds).toBe(300);
  });

  test('score is clamped between 50 and 160', () => {
    const allCorrect = {};
    iqQuestions.forEach((q) => { allCorrect[q.id] = q.correct; });
    const result = calculateIQ(allCorrect);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(160);
  });
});

describe('calculateMBTI', () => {
  test('all A choices give a consistent type', () => {
    const allA = {};
    mbtiQuestions.forEach((q) => { allA[q.id] = 0; });
    const result = calculateMBTI(allA);
    expect(result.typeCode).toHaveLength(4);
    expect(result.typeInfo).toBeDefined();
    expect(result.dimensions).toHaveLength(4);
  });

  test('all B choices give a consistent type', () => {
    const allB = {};
    mbtiQuestions.forEach((q) => { allB[q.id] = 1; });
    const result = calculateMBTI(allB);
    expect(result.typeCode).toHaveLength(4);
    expect(result.typeInfo).toBeDefined();
  });

  test('all A and all B give opposite types', () => {
    const allA = {};
    const allB = {};
    mbtiQuestions.forEach((q) => { allA[q.id] = 0; allB[q.id] = 1; });
    const resultA = calculateMBTI(allA);
    const resultB = calculateMBTI(allB);
    expect(resultA.typeCode).not.toBe(resultB.typeCode);
  });

  test('returns 4 dimensions', () => {
    const answers = {};
    mbtiQuestions.forEach((q) => { answers[q.id] = 0; });
    const result = calculateMBTI(answers);
    expect(result.dimensions).toHaveLength(4);
  });

  test('each dimension has required fields', () => {
    const answers = {};
    mbtiQuestions.forEach((q) => { answers[q.id] = 0; });
    const result = calculateMBTI(answers);
    result.dimensions.forEach((dim) => {
      expect(dim).toHaveProperty('code');
      expect(dim).toHaveProperty('label');
      expect(dim).toHaveProperty('dominant');
      expect(dim).toHaveProperty('recessive');
      expect(dim).toHaveProperty('dominantScore');
      expect(dim).toHaveProperty('description');
      expect(['EI', 'SN', 'TF', 'JP']).toContain(dim.code);
    });
  });

  test('accepts custom question set', () => {
    const customQs = [mbtiQuestions[0]];
    const answers = { [customQs[0].id]: 0 };
    const result = calculateMBTI(answers, customQs);
    expect(result.typeCode).toHaveLength(4);
  });

  test('partial answers are handled gracefully', () => {
    const partial = {};
    mbtiQuestions.slice(0, 2).forEach((q) => { partial[q.id] = 0; });
    const result = calculateMBTI(partial);
    expect(result.typeCode).toHaveLength(4);
    expect(result.dimensions).toHaveLength(4);
  });

  test('empty answers returns a valid type', () => {
    const result = calculateMBTI({});
    expect(result.typeCode).toHaveLength(4);
    expect(result.dimensions).toHaveLength(4);
  });
});
