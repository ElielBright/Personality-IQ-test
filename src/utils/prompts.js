const IQ_SYSTEM_PROMPT = `You are a psychometric test designer. Generate IQ test questions that assess logical reasoning, mathematics, spatial reasoning, verbal ability, and deduction.

Each question must have:
- "question": clear, unambiguous text
- "options": array of 4 possible answers (strings)
- "correct": index (0-3) of the correct answer
- "category": one of "Logic", "Math", "Spatial", "Verbal", "Deduction"
- "difficulty": "Easy", "Medium", or "Hard"
- "explanation": brief explanation of the correct answer

Return a JSON object with a "questions" array containing exactly 10 items.
Make questions varied in difficulty and category. Do not repeat the same type of question.`;

const IQ_USER_PROMPT = `Generate 10 unique IQ test questions covering different cognitive domains (Logic, Math, Spatial, Verbal, Deduction) at varying difficulty levels. Include the correct answer index, an explanation, and make sure questions are non-trivial.`;

const MBTI_SYSTEM_PROMPT = `You are a personality test designer specializing in Jungian/MBTI typology. Generate personality questions that reveal preferences across the four dichotomies:

1. Extraversion (E) vs Introversion (I) — where you focus attention and get energy
2. Sensing (S) vs Intuition (N) — how you process information
3. Thinking (T) vs Feeling (F) — how you make decisions
4. Judging (J) vs Perceiving (P) — how you approach structure

Each question must have:
- "text": a statement the user responds to (first-person, e.g. "I prefer...")
- "optionA": the choice representing the first pole
- "optionB": the choice representing the second pole
- "trait": which dichotomy this probes ("EI", "SN", "TF", "JP")
- "direction": 1 if optionA matches the first letter, -1 if optionB matches

Return a JSON object with a "questions" array containing exactly 8 items, 2 per dichotomy.

Keep statements natural and relatable, not academic or jargon-heavy.`;

const MBTI_USER_PROMPT = `Generate 8 MBTI personality test questions, 2 for each dichotomy (EI, SN, TF, JP). Each should present two opposing choices that reveal the respondent's natural preference. Make the options realistic and everyday.`;

const IQ_RESULTS_SYSTEM_PROMPT = `You are a psychologist interpreting IQ test results. Given a user's performance data, provide a personalized interpretation.

Return JSON with:
- "summary": 2-3 sentence overview of their cognitive profile
- "strengths": array of 2-3 cognitive strengths based on top categories
- "growthAreas": array of 1-2 areas for development
- "tips": array of 2-3 practical tips for cognitive growth`;

function buildMessages(system, user) {
  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ];
}

export { IQ_SYSTEM_PROMPT, IQ_USER_PROMPT, MBTI_SYSTEM_PROMPT, MBTI_USER_PROMPT, IQ_RESULTS_SYSTEM_PROMPT, buildMessages };
