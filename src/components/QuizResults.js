import { useEffect, useState } from 'react';
import ShareMenu from './ShareMenu';
import { QUIZ_CATEGORIES } from '../utils/quizPrompts';
import { ensureAuth, getQuizStats, saveQuizSession } from '../utils/firebase';

const QuizResults = ({ data, onRestart, onBack }) => {
  const [stats, setStats] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(true);

  const { answers, questions, category, correct, total, streakCurrent, streakEnded } = data;
  const pct = Math.round((correct / total) * 100);
  const catInfo = QUIZ_CATEGORIES.find((c) => c.id === category);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await ensureAuth();
        const prev = await getQuizStats(user.uid);
        if (!cancelled) setStats(prev);
        await saveQuizSession(user.uid, { correct, total, category, streakCurrent, streakEnded });
        if (!cancelled) {
          const updated = await getQuizStats(user.uid);
          setStats(updated);
          setSaved(true);
        }
      } catch (e) {
        console.warn('Quiz stats save failed:', e.message);
      } finally {
        if (!cancelled) setSaving(false);
      }
    })();
    return () => { cancelled = true; };
  }, [correct, total, category, streakCurrent, streakEnded]);

  const prevOverall = stats?.overall;
  const prevCat = stats?.categories?.[category];
  const improvement = prevOverall?.totalAttempted > 0
    ? pct - Math.round((prevOverall.totalCorrect / prevOverall.totalAttempted) * 100)
    : 0;

  const analysisLevel = pct >= 90 ? 'expert' : pct >= 70 ? 'strong' : pct >= 50 ? 'developing' : 'beginner';

  const analysisTexts = {
    expert: 'Outstanding performance! You demonstrate deep knowledge and quick recall in this area.',
    strong: 'Solid performance! You have a good grasp of the material with room to refine a few topics.',
    developing: 'You\'re building your knowledge. Review the explanations for missed questions to level up.',
    beginner: 'This topic has plenty to explore. Use the explanations as learning opportunities for next time.'
  };

  return (
    <div className="result-container">
      <div className="result-hero">
        <span className="result-badge" style={{ background: catInfo?.icon ? '#7c3aed' : '#4f46e5' }}>
          {catInfo?.label || category} Quiz
        </span>
        <div className={`quiz-score-circle quiz-score-${analysisLevel}`}>
          <span className="quiz-score-number">{pct}%</span>
          <span className="quiz-score-label">{correct}/{total}</span>
        </div>
        <p className="result-hero-subtitle" style={{ marginTop: '0.75rem' }}>
          {analysisTexts[analysisLevel]}
        </p>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">🔥 Streak</h3>
        <div className="quiz-streak-display">
          <div className="quiz-streak-stat">
            <span className="quiz-streak-stat-value">{streakCurrent}</span>
            <span className="quiz-streak-stat-label">Best This Session</span>
          </div>
          {stats && (
            <>
              <div className="quiz-streak-stat">
                <span className="quiz-streak-stat-value">{prevOverall?.currentStreak || 0}</span>
                <span className="quiz-streak-stat-label">Current Streak</span>
              </div>
              <div className="quiz-streak-stat">
                <span className="quiz-streak-stat-value">{prevOverall?.bestStreak || 0}</span>
                <span className="quiz-streak-stat-label">All-Time Best</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">📈 Improvement</h3>
        <div className="quiz-improvement">
          <div className="quiz-improvement-stat">
            <span className="quiz-improvement-value">
              {prevOverall?.totalAttempted > 0 ? `${improvement > 0 ? '+' : ''}${improvement}%` : '—'}
            </span>
            <span className="quiz-improvement-label">vs Your Average</span>
          </div>
          <div className="quiz-improvement-stat">
            <span className="quiz-improvement-value">{prevOverall?.sessionsCount || 1}</span>
            <span className="quiz-improvement-label">Total Sessions</span>
          </div>
          <div className="quiz-improvement-stat">
            <span className="quiz-improvement-value">{prevOverall?.totalAttempted || 0}</span>
            <span className="quiz-improvement-label">Questions Answered</span>
          </div>
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">📋 Answer Review</h3>
        <div className="quiz-review-list">
          {questions.map((q, i) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correct;
            return (
              <div key={q.id} className={`quiz-review-card ${isCorrect ? 'quiz-review-card-correct' : 'quiz-review-card-wrong'}`}>
                <div className="quiz-review-card-header">
                  <span className="test-question-number">Q{i + 1}</span>
                  <span className={isCorrect ? 'status-correct' : 'status-wrong'}>{isCorrect ? '✓ Correct' : '✗ Wrong'}</span>
                </div>
                <p className="quiz-review-card-question">{q.question}</p>
                <div className="quiz-review-card-answers">
                  <div>Your answer: <strong>{q.options[selected]}</strong></div>
                  {!isCorrect && <div>Correct: <strong className="answer-correct">{q.options[q.correct]}</strong></div>}
                </div>
                <p className="result-review-explain">{q.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-actions">
        <ShareMenu type="quiz" data={{ category: catInfo?.label || category, score: pct, correct, total }} />
        <button onClick={onRestart} className="quiz-play-again-button">
          Play Again →
        </button>
        <button onClick={onBack} className="result-restart-button">
          ← Change Category
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
