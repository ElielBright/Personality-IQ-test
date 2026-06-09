import { useState } from 'react';
import QuizProgress from './QuizProgress';
import Timer from './Timer';

const IQ_TIME = 15 * 60;

const IQTest = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [timeExpired, setTimeExpired] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="test-error">No questions available. Please try again.</div>;
  }

  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (qId, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = () => {
    onComplete(answers);
  };

  const handleExpire = () => {
    setTimeExpired(true);
    onComplete(answers);
  };

  return (
    <div className="test-container">
      <div className="test-header">
        <div>
          <span className="test-badge">Cognitive Assessment</span>
          <h2 className="test-heading">IQ Test</h2>
        </div>
        <Timer initialSeconds={IQ_TIME} running={!timeExpired} onExpire={handleExpire} />
      </div>

      <QuizProgress current={answeredCount} total={questions.length} />

      <div className="test-questions">
        {questions.map((q, idx) => (
          <div key={q.id} className={`test-question ${answers[q.id] !== undefined ? 'test-question-answered' : ''}`}>
            <div className="test-question-header">
              <span className="test-question-number">Q{idx + 1}</span>
              {q.difficulty && (
                <span className={`test-difficulty test-difficulty-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
              )}
              {q.category && <span className="test-category">{q.category}</span>}
            </div>
            <p className="test-question-text">{q.question}</p>
            <div className="test-options">
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleAnswer(q.id, optIdx)}
                  className={`test-option ${answers[q.id] === optIdx ? 'test-option-selected' : ''}`}
                >
                  <span className="test-option-letter">{String.fromCharCode(65 + optIdx)}</span>
                  <span className="test-option-text">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="test-footer">
        <p className="test-answered-count">{answeredCount} of {questions.length} answered</p>
        <button
          onClick={handleSubmit}
          className="test-submit-button"
          disabled={answeredCount < questions.length}
        >
          {answeredCount < questions.length
            ? `Answer all questions (${questions.length - answeredCount} remaining)`
            : 'Calculate My IQ Score →'}
        </button>
      </div>
    </div>
  );
};

export default IQTest;
