import { useState, useCallback, useEffect } from 'react';
import { QUIZ_CATEGORIES } from '../utils/quizPrompts';

const QUESTIONS_PER_ROUND = 8;

const QuickQuiz = ({ questions, category, onComplete, onBack }) => {
  const [phase, setPhase] = useState('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const current = questions?.[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions?.length;

  const handleAnswer = useCallback((choice) => {
    const updated = { ...answers, [current.id]: choice };
    setAnswers(updated);

    const correct = choice === current.correct;
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);

    if (currentIdx < questions.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 250);
    }
  }, [answers, current, currentIdx, streak, bestStreak, questions]);

  const handleFinish = useCallback(() => {
    const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;
    onComplete({
      answers,
      questions,
      category,
      correct: correctCount,
      total: questions.length,
      streakCurrent: bestStreak,
      streakEnded: streak === 0 && answeredCount === questions.length
    });
  }, [answers, questions, category, bestStreak, streak, onComplete, answeredCount]);

  if (phase === 'intro') {
    const catInfo = QUIZ_CATEGORIES.find((c) => c.id === category);
    return (
      <div className="quiz-intro">
        <div className="quiz-intro-icon">{catInfo?.icon || '🎯'}</div>
        <h2 className="quiz-intro-title">{catInfo?.label || category} Quiz</h2>
        <p className="quiz-intro-desc">{catInfo?.description || ''}</p>
        <div className="quiz-intro-info">
          <span>{QUESTIONS_PER_ROUND} questions</span>
          <span>Mixed difficulty</span>
          <span>Multiple choice</span>
        </div>
        <div className="quiz-intro-actions">
          <button onClick={() => setPhase('playing')} className="quiz-start-button">
            Start Quiz →
          </button>
          <button onClick={onBack} className="quiz-back-button">← Change Category</button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div className="test-error">No questions available.</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-header-left">
          <div className="quiz-streak">
            <span className="quiz-streak-icon">🔥</span>
            <span className="quiz-streak-count">{streak}</span>
          </div>
        </div>
        <div className="quiz-header-center">
          <div className="quiz-progress-text">
            {currentIdx + 1} of {questions.length}
          </div>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} />
          </div>
        </div>
        <div className="quiz-header-right">
          <span className="quiz-score-badge">{answeredCount - (streak === 0 && answeredCount > 0 ? 1 : 0) + (streak)}/{answeredCount || 0}</span>
        </div>
      </div>

      {!isComplete && current && (
        <div className="quiz-card">
          <span className="quiz-question-num">Q{currentIdx + 1}</span>
          <p className="quiz-question-text">{current.question}</p>
          <div className="quiz-options">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`quiz-option ${answers[current.id] === i ? 'quiz-option-selected' : ''}`}
                disabled={answers[current.id] !== undefined}
              >
                <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="quiz-option-text">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="quiz-complete">
          <div className="quiz-complete-icon">✓</div>
          <h3>All Done!</h3>
          <p>You answered all {questions.length} questions. Review or submit your results.</p>
          <div className="quiz-review-grid">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`quiz-review-item ${answers[q.id] === q.correct ? 'quiz-review-correct' : 'quiz-review-wrong'}`}
              >
                <span className="quiz-review-num">Q{idx + 1}</span>
                <span className="quiz-review-status">{answers[q.id] === q.correct ? '✓' : '✗'}</span>
              </button>
            ))}
          </div>
          <button onClick={handleFinish} className="quiz-submit-button">
            See My Results →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickQuiz;
