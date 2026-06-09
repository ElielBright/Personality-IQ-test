const Home = ({ onStart, onStartQuiz, aiAvailable }) => {
  const aiLabel = aiAvailable ? 'AI-generated questions' : 'Curated questions';

  const tests = [
    {
      key: 'iq-test',
      icon: '🧠',
      title: 'IQ Test',
      description: `${aiAvailable ? 'AI-generated' : 'Expert-crafted'} questions measuring logical reasoning, mathematics, spatial awareness, verbal ability, and deduction.`,
      features: [aiLabel, '~15 minutes', '5 cognitive domains', 'Percentile scoring'],
      time: '15 min'
    },
    {
      key: 'personality-test',
      icon: '👤',
      title: 'Personality Type Test',
      description: 'Discover your Jungian personality type (like INTJ, ENFP, etc.) — the world\'s most popular personality framework.',
      features: [aiLabel, '~8 minutes', '4 personality dimensions', 'Detailed type profile'],
      time: '8 min'
    }
  ];

  const quizCategories = [
    { id: 'logic', icon: '🧩', label: 'Logic' },
    { id: 'math', icon: '📐', label: 'Math' },
    { id: 'science', icon: '🔬', label: 'Science' },
    { id: 'history', icon: '📜', label: 'History' },
    { id: 'geography', icon: '🌍', label: 'Geo' },
    { id: 'literature', icon: '📚', label: 'Lit' },
    { id: 'tech', icon: '💻', label: 'Tech' },
    { id: 'random', icon: '🎲', label: 'Mixed' },
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <h2 className="home-title">
          Discover Your <span className="text-gradient">Potential</span>
        </h2>
        <p className="home-subtitle">
          {aiAvailable
            ? 'AI-powered cognitive and personality assessments — fresh questions every time.'
            : 'Cognitive and personality assessments for personal growth.'}
        </p>
      </div>
      <div className="home-cards">
        {tests.map((test) => (
          <div key={test.key} onClick={() => onStart(test.key)} className="home-card">
            <div className="home-card-icon">{test.icon}</div>
            <h3 className="home-card-title">{test.title}</h3>
            <p className="home-card-desc">{test.description}</p>
            <ul className="home-card-features">
              {test.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="home-card-footer">
              <span className="home-card-time">{test.time}</span>
              <span className="home-card-button">Start Test →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="quiz-section">
        <div className="quiz-section-header">
          <h3 className="quiz-section-title">⚡ Quick Quiz</h3>
          <p className="quiz-section-desc">Pick a topic, answer 8 AI-generated questions, and track your streaks.</p>
        </div>
        <div className="quiz-category-grid">
          {quizCategories.map((cat) => (
            <button key={cat.id} onClick={() => onStartQuiz?.(cat.id)} className="quiz-category-card">
              <span className="quiz-category-icon">{cat.icon}</span>
              <span className="quiz-category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
