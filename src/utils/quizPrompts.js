const QUIZ_SYSTEM_PROMPT = `You are a quiz master. Generate multiple-choice quiz questions on a specific topic.

Each question must have:
- "question": clear, unambiguous text at high school or college level
- "options": array of exactly 4 possible answers (strings), only one correct
- "correct": index (0-3) of the correct answer
- "explanation": brief explanation of the correct answer

Return a JSON object with a "questions" array containing exactly 8 items.
Make questions varied in difficulty (mix easy, medium, hard). Do not repeat the same concept twice.`;

function buildQuizPrompt(category) {
  return `Generate 8 challenging multiple-choice quiz questions about "${category}".
Cover different aspects and subtopics within ${category}.
Mix easy, medium, and hard questions. Each must have 4 options and one correct answer.`;
}

const QUIZ_CATEGORIES = [
  { id: 'logic', label: 'Logic & Reasoning', icon: '🧩', description: 'Puzzles, patterns, and deductive reasoning' },
  { id: 'math', label: 'Mathematics', icon: '📐', description: 'Arithmetic, algebra, geometry, and number theory' },
  { id: 'science', label: 'Science', icon: '🔬', description: 'Physics, chemistry, biology, and astronomy' },
  { id: 'history', label: 'History', icon: '📜', description: 'World events, civilizations, and notable figures' },
  { id: 'geography', label: 'Geography', icon: '🌍', description: 'Countries, capitals, landmarks, and natural features' },
  { id: 'literature', label: 'Literature', icon: '📚', description: 'Books, authors, poetry, and literary devices' },
  { id: 'tech', label: 'Technology', icon: '💻', description: 'Computers, programming, inventions, and digital culture' },
  { id: 'random', label: 'Mixed', icon: '🎲', description: 'Random topics for a general knowledge challenge' },
];

export { QUIZ_SYSTEM_PROMPT, buildQuizPrompt, QUIZ_CATEGORIES };
