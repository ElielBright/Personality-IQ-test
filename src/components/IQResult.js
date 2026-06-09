import { calculateIQ } from '../utils/scoring';
import ShareMenu from './ShareMenu';

const IQResult = ({ answers, questions, onRestart }) => {
  const result = calculateIQ(answers, questions);

  const getScoreClass = () => {
    if (result.score >= 120) return 'score-elite';
    if (result.score >= 110) return 'score-great';
    if (result.score >= 90) return 'score-good';
    return 'score-fair';
  };

  return (
    <div className="result-container">
      <div className={`result-hero ${getScoreClass()}`}>
        <h2 className="result-hero-title">Your Cognitive Assessment</h2>
        <div className="result-score-circle">
          <span className="result-score-number">{result.score}</span>
          <span className="result-score-label">IQ Score</span>
        </div>
        <div className="result-badge" style={{ backgroundColor: result.color }}>
          {result.interpretation.label}
        </div>
        <div className="result-stats">
          <div className="result-stat">
            <span className="result-stat-value">{result.percentile}%</span>
            <span className="result-stat-label">Percentile</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-value">{result.rawScore}/{result.maxScore}</span>
            <span className="result-stat-label">Correct</span>
          </div>
          <div className="result-stat">
            <span className="result-stat-value">{result.timeSpentSeconds ? `${Math.round(result.timeSpentSeconds / 60)}m` : '—'}</span>
            <span className="result-stat-label">Time</span>
          </div>
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">What This Means</h3>
        <p className="result-description">{result.interpretation.description}</p>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Domain Breakdown</h3>
        <div className="result-categories">
          {result.categoryBreakdown.map((cat) => (
            <div key={cat.name} className="result-category">
              <div className="result-category-header">
                <span className="result-category-name">{cat.name}</span>
                <span className="result-category-score">{cat.score}%</span>
              </div>
              <div className="result-category-bar">
                <div
                  className="result-category-fill"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <span className="result-category-detail">{cat.correct}/{cat.total} correct</span>
            </div>
          ))}
        </div>
      </div>

      {questions && questions.length > 0 && (
        <div className="result-section">
          <h3 className="result-section-title">Answer Review</h3>
          <div className="result-review">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correct;

              return (
                <div key={q.id} className={`result-review-item ${isCorrect ? 'result-review-correct' : 'result-review-wrong'}`}>
                  <div className="result-review-header">
                    <span className="result-review-num">Q{idx + 1}</span>
                    <span className={`result-review-status ${isCorrect ? 'status-correct' : 'status-wrong'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="result-review-question">{q.question}</p>
                  <div className="result-review-answers">
                    <div className="result-review-your">
                      <span className="result-review-label">Your answer:</span>
                      <span className={isCorrect ? 'answer-correct' : 'answer-wrong'}>
                        {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="result-review-correct-answer">
                        <span className="result-review-label">Correct answer:</span>
                        <span className="answer-correct">{q.options[q.correct]}</span>
                      </div>
                    )}
                  </div>
                  {q.explanation && (
                    <p className="result-review-explain">{q.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="result-actions">
        <ShareMenu type="iq" data={result} />
        <button onClick={onRestart} className="result-restart-button">
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default IQResult;
