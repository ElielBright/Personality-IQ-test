import { useState } from 'react';
import QuizProgress from './QuizProgress';

const PersonalityTest = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!questions || questions.length === 0) {
    return <div className="test-error">No questions available. Please try again.</div>;
  }

  const current = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;

  const handleAnswer = (choice) => {
    const updated = { ...answers, [current.id]: choice };
    setAnswers(updated);

    if (currentIdx < questions.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 200);
    }
  };

  const handleReview = (idx) => {
    setCurrentIdx(idx);
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const hasAnswer = (qId) => answers[qId] !== undefined;

  return (
    <div className="test-container">
      <div className="test-header">
        <div>
          <span className="test-badge">Psychological Profile</span>
          <h2 className="test-heading">Personality Type Test</h2>
        </div>
        <div className="test-header-info">
          <span className="test-badge-light">Jungian Typology</span>
        </div>
      </div>

      <QuizProgress current={answeredCount} total={questions.length} />

      {!isComplete && current && (
        <div className="mbti-card">
          <div className="mbti-card-header">
            <span className="test-question-number">Q{currentIdx + 1}</span>
            <span className="mbti-dimension-badge">{current.trait}</span>
          </div>

          <p className="mbti-question-text">{current.text}</p>

          <div className="mbti-choices">
            <button
              onClick={() => handleAnswer(0)}
              className={`mbti-choice ${answers[current.id] === 0 ? 'mbti-choice-selected' : ''}`}
            >
              <span className="mbti-choice-marker">A</span>
              <span className="mbti-choice-text">{current.optionA}</span>
            </button>
            <div className="mbti-divider">
              <span className="mbti-or">OR</span>
            </div>
            <button
              onClick={() => handleAnswer(1)}
              className={`mbti-choice ${answers[current.id] === 1 ? 'mbti-choice-selected' : ''}`}
            >
              <span className="mbti-choice-marker">B</span>
              <span className="mbti-choice-text">{current.optionB}</span>
            </button>
          </div>

          <div className="mbti-nav">
            {currentIdx > 0 && (
              <button onClick={() => setCurrentIdx(currentIdx - 1)} className="mbti-nav-button">
                ← Previous
              </button>
            )}
            <div className="mbti-nav-center">
              <div className="mbti-dots">
                {questions.map((q, idx) => (
                  <span
                    key={q.id}
                    className={`mbti-dot ${idx === currentIdx ? 'mbti-dot-active' : ''} ${hasAnswer(q.id) ? 'mbti-dot-done' : ''}`}
                    onClick={() => handleReview(idx)}
                  />
                ))}
              </div>
              <span className="mbti-counter">{currentIdx + 1} of {questions.length}</span>
            </div>
            {currentIdx < questions.length - 1 && (
              <button onClick={() => setCurrentIdx(currentIdx + 1)} className="mbti-nav-button mbti-nav-skip">
                Skip →
              </button>
            )}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="personality-complete">
          <div className="personality-complete-icon">✓</div>
          <h3>All Questions Answered</h3>
          <p>You've responded to all {questions.length} questions. Review or submit your results.</p>
          <div className="mbti-review-grid">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => handleReview(idx)}
                className={`mbti-review-item ${hasAnswer(q.id) ? 'mbti-review-done' : ''}`}
              >
                <span className="mbti-review-num">Q{idx + 1}</span>
                <span className="mbti-review-trait">{q.trait}</span>
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} className="test-submit-button">
            Discover My Personality Type →
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalityTest;
