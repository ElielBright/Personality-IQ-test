import { iqQuestions, mbtiQuestions, mbtiTypes, iqInterpretation } from '../data';

describe('IQ Questions Data', () => {
  test('has exactly 15 questions', () => {
    expect(iqQuestions).toHaveLength(15);
  });

  test('each question has required fields', () => {
    iqQuestions.forEach((q) => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('options');
      expect(q).toHaveProperty('correct');
      expect(q).toHaveProperty('category');
      expect(q).toHaveProperty('difficulty');
      expect(q).toHaveProperty('explanation');
      expect(typeof q.id).toBe('number');
      expect(typeof q.question).toBe('string');
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
    });
  });

  test('has unique question ids', () => {
    const ids = iqQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('covers all categories', () => {
    const categories = [...new Set(iqQuestions.map((q) => q.category))];
    expect(categories).toEqual(
      expect.arrayContaining(['Logic', 'Math', 'Verbal', 'Deduction', 'Spatial', 'Categorization'])
    );
  });

  test('covers all difficulty levels', () => {
    const difficulties = [...new Set(iqQuestions.map((q) => q.difficulty))];
    expect(difficulties.sort()).toEqual(['Easy', 'Hard', 'Medium']);
  });

  test('each explanation is non-empty', () => {
    iqQuestions.forEach((q) => {
      expect(q.explanation.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('MBTI Questions Data', () => {
  test('has exactly 8 questions', () => {
    expect(mbtiQuestions).toHaveLength(8);
  });

  test('each question has required fields', () => {
    mbtiQuestions.forEach((q) => {
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('text');
      expect(q).toHaveProperty('optionA');
      expect(q).toHaveProperty('optionB');
      expect(q).toHaveProperty('trait');
      expect(q).toHaveProperty('direction');
      expect(typeof q.id).toBe('number');
      expect(typeof q.text).toBe('string');
      expect(q.text.length).toBeGreaterThan(0);
      expect(['EI', 'SN', 'TF', 'JP']).toContain(q.trait);
      expect([1, -1]).toContain(q.direction);
    });
  });

  test('has unique question ids', () => {
    const ids = mbtiQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('covers all 4 MBTI dichotomies', () => {
    const traits = [...new Set(mbtiQuestions.map((q) => q.trait))];
    expect(traits.sort()).toEqual(['EI', 'JP', 'SN', 'TF']);
  });

  test('each dichotomy has exactly 2 questions', () => {
    const counts = {};
    mbtiQuestions.forEach((q) => {
      counts[q.trait] = (counts[q.trait] || 0) + 1;
    });
    Object.values(counts).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  test('all questions map optionA to first trait letter', () => {
    mbtiQuestions.forEach((q) => {
      expect(q.direction).toBe(1);
    });
  });
});

describe('MBTI Types', () => {
  test('has all 16 types', () => {
    expect(Object.keys(mbtiTypes)).toHaveLength(16);
  });

  test('each type has required fields', () => {
    Object.values(mbtiTypes).forEach((type) => {
      expect(type).toHaveProperty('label');
      expect(type).toHaveProperty('description');
      expect(type).toHaveProperty('strengths');
      expect(type).toHaveProperty('weaknesses');
      expect(type).toHaveProperty('careers');
      expect(Array.isArray(type.strengths)).toBe(true);
      expect(Array.isArray(type.weaknesses)).toBe(true);
      expect(Array.isArray(type.careers)).toBe(true);
    });
  });

  test('includes INTJ type', () => {
    expect(mbtiTypes.INTJ).toBeDefined();
    expect(mbtiTypes.INTJ.label).toContain('INTJ');
  });

  test('includes all 4-letter type codes', () => {
    const expectedCodes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
                           'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
    expectedCodes.forEach((code) => {
      expect(mbtiTypes[code]).toBeDefined();
    });
  });
});

describe('IQ Interpretation', () => {
  test('has all required levels', () => {
    const levels = Object.values(iqInterpretation);
    expect(levels.length).toBeGreaterThanOrEqual(5);
    levels.forEach((level) => {
      expect(level).toHaveProperty('min');
      expect(level).toHaveProperty('label');
      expect(level).toHaveProperty('description');
      expect(level).toHaveProperty('color');
      expect(typeof level.min).toBe('number');
      expect(typeof level.label).toBe('string');
      expect(level.description.length).toBeGreaterThan(0);
    });
  });

  test('covers full range from 0 to genius', () => {
    const levels = Object.values(iqInterpretation);
    const minLevel = Math.min(...levels.map((l) => l.min));
    expect(minLevel).toBe(0);
    const maxLabel = levels.find((l) => l.label === 'Genius');
    expect(maxLabel).toBeDefined();
  });
});
