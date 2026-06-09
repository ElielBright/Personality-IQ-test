import { calculatePersonality } from '../utils/scoring';
import { personalityQuestions, traitDescriptions } from '../data';
import ShareMenu from './ShareMenu';

const levelColors = {
  low: { bg: '#fef2f2', bar: '#f43f5e', text: '#dc2626' },
  moderate: { bg: '#fffbeb', bar: '#f59e0b', text: '#d97706' },
  high: { bg: '#f0fdf4', bar: '#10b981', text: '#059669' }
};

const PersonalityResult = ({ answers, onRestart }) => {
  const traits = calculatePersonality(answers);

  const traitKeys = Object.keys(traitDescriptions);

  return (
    <div className="result-container">
      <div className="result-hero result-hero-personality">
        <h2 className="result-hero-title">Your Personality Blueprint</h2>
        <p className="result-hero-subtitle">
          Based on the Big Five model — the most empirically validated framework in personality psychology.
        </p>
      </div>

      <div className="result-traits">
        {traitKeys.map((key) => {
          const t = traits[key];
          const colors = levelColors[t.level];

          return (
            <div key={key} className="result-trait" style={{ backgroundColor: colors.bg, borderColor: colors.bar }}>
              <div className="result-trait-header">
                <div>
                  <span className="result-trait-name">{t.label}</span>
                  <span className="result-trait-level" style={{ color: colors.text }}>
                    {t.level.charAt(0).toUpperCase() + t.level.slice(1)}
                  </span>
                </div>
                <span className="result-trait-pct">{t.percentage}%</span>
              </div>
              <div className="result-trait-bar">
                <div
                  className="result-trait-fill"
                  style={{ width: `${t.percentage}%`, backgroundColor: colors.bar }}
                />
              </div>
              <p className="result-trait-desc">{t.description}</p>
            </div>
          );
        })}
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Understanding the Big Five</h3>
        <div className="result-framework">
          {traitKeys.map((key) => {
            const t = traits[key];
            const colors = levelColors[t.level];
            return (
              <div key={key} className="result-framework-item">
                <div className="result-framework-header" style={{ color: colors.text }}>
                  <strong>{t.label}:</strong> {t.level.charAt(0).toUpperCase() + t.level.slice(1)}
                </div>
                <p>{t.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Response Summary</h3>
        <div className="result-response-summary">
          {personalityQuestions.map((q, idx) => {
            const val = answers[q.id];
            return (
              <div key={q.id} className="result-response-item">
                <span className="result-response-num">Q{idx + 1}</span>
                <span className="result-response-text">{q.text}</span>
                <span className="result-response-val">
                  {val !== undefined ? ['','SD','D','N','A','SA'][val] : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="result-actions">
        <ShareMenu type="personality" data={traits} />
        <button onClick={onRestart} className="result-restart-button">
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default PersonalityResult;
