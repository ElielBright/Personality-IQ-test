const QuestionLoader = ({ type }) => {
  const messages = {
    'iq-test': '🧠 Generating your personalized IQ questions...',
    'personality-test': '👤 Crafting your personality assessment...',
    'quiz': '🎯 Generating quiz questions for you...'
  };

  const tips = {
    'iq-test': [
      'Questions cover Logic, Math, Spatial, Verbal, and Deduction',
      'Each question is generated fresh for you',
      'You\'ll get a detailed breakdown of your cognitive profile'
    ],
    'personality-test': [
      'Based on Jungian typology (the MBTI framework)',
      '8 questions across 4 personality dimensions',
      'Discover your 4-letter personality type'
    ],
    'quiz': [
      'Questions adapt to your chosen topic',
      'Track your streaks and watch your scores improve',
      'Results saved to your personal history'
    ]
  };

  const iconMap = { 'iq-test': '🧠', 'personality-test': '👤', 'quiz': '🎯' };

  const currentTips = tips[type] || [];
  const message = messages[type] || 'Loading...';

  return (
    <div className="loader-container">
      <div className="loader-card">
        <div className="loader-spinner">
          <div className="loader-ring" />
          <span className="loader-icon">{iconMap[type] || '⏳'}</span>
        </div>
        <h3 className="loader-title">{message}</h3>
        <div className="loader-tips">
          {currentTips.map((tip, i) => (
            <div key={i} className="loader-tip">
              <span className="loader-tip-bullet">◆</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
        <p className="loader-note">This usually takes a few seconds...</p>
      </div>
    </div>
  );
};

export default QuestionLoader;
