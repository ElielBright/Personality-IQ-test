import { calculateMBTI } from '../utils/scoring';
import ShareMenu from './ShareMenu';

const dichotomyDescriptions = {
  E: 'You draw energy from social interaction and external activity. You tend to think out loud and process ideas by discussing them.',
  I: 'You draw energy from solitude and reflection. You prefer to think things through internally before sharing.',
  S: 'You focus on concrete facts, details, and present realities. You trust what is tangible and observable.',
  N: 'You focus on patterns, possibilities, and future implications. You enjoy exploring abstract ideas and theories.',
  T: 'You make decisions based on logic, consistency, and objective analysis. You value fairness and truth over harmony.',
  F: 'You make decisions based on values, empathy, and harmony. You consider how choices affect people.',
  J: 'You prefer structure, planning, and decided outcomes. You feel comfortable when things are settled.',
  P: 'You prefer flexibility, spontaneity, and keeping options open. You adapt easily to changing circumstances.'
};

const MBTIResult = ({ answers, questions, onRestart }) => {
  const result = calculateMBTI(answers, questions);

  const letterLabels = {
    E: 'Extraversion', I: 'Introversion',
    S: 'Sensing', N: 'Intuition',
    T: 'Thinking', F: 'Feeling',
    J: 'Judging', P: 'Perceiving'
  };

  return (
    <div className="result-container">
      <div className="result-hero result-hero-mbti">
        <span className="mbti-result-badge">Your Personality Type</span>
        <h2 className="mbti-result-type">{result.typeCode}</h2>
        <p className="mbti-result-label">{result.typeInfo.label}</p>
        <p className="mbti-result-desc">{result.typeInfo.description}</p>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Dimension Scores</h3>
        <div className="mbti-dimensions">
          {result.dimensions.map((dim) => (
            <div key={dim.code} className="mbti-dimension">
              <div className="mbti-dimension-header">
                <span className="mbti-dimension-label">{dim.label}</span>
                <span className="mbti-dimension-preference">
                  {letterLabels[dim.dominant]} ({dim.dominant})
                </span>
              </div>
              <div className="mbti-dimension-bar-container">
                <div className="mbti-dimension-bar">
                  <div
                    className="mbti-dimension-fill"
                    style={{ width: `${dim.dominantScore}%` }}
                  />
                </div>
                <div className="mbti-dimension-labels">
                  <span className={`mbti-dim-letter ${dim.dominant === dim.code[0] ? 'active' : ''}`}>
                    {dim.code[0]}
                  </span>
                  <span className="mbti-dim-pcts">
                    {dim.dominantScore}% / {dim.recessiveScore}%
                  </span>
                  <span className={`mbti-dim-letter ${dim.dominant === dim.code[1] ? 'active' : ''}`}>
                    {dim.code[1]}
                  </span>
                </div>
              </div>
              <p className="mbti-dimension-desc">{dim.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Your Preferences Explained</h3>
        <div className="mbti-preferences">
          {result.typeCode.split('').map((letter) => (
            <div key={letter} className="mbti-preference">
              <span className="mbti-pref-letter">{letter}</span>
              <div>
                <strong>{letterLabels[letter]}</strong>
                <p>{dichotomyDescriptions[letter]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-section-title">Strengths & Growth Areas</h3>
        <div className="mbti-strengths-grid">
          <div className="mbti-strengths">
            <h4 className="mbti-subtitle">✨ Strengths</h4>
            <ul className="mbti-list">
              {result.typeInfo.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="mbti-growth">
            <h4 className="mbti-subtitle">🌱 Growth Areas</h4>
            <ul className="mbti-list">
              {result.typeInfo.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {result.typeInfo.careers && result.typeInfo.careers.length > 0 && (
        <div className="result-section">
          <h3 className="result-section-title">Common Career Paths</h3>
          <div className="mbti-careers">
            {result.typeInfo.careers.map((c, i) => (
              <span key={i} className="mbti-career-tag">{c}</span>
            ))}
          </div>
        </div>
      )}

      <div className="result-actions">
        <ShareMenu type="personality" data={{ typeCode: result.typeCode, label: result.typeInfo.label, dimensions: result.dimensions }} />
        <button onClick={onRestart} className="result-restart-button">
          Take Test Again
        </button>
      </div>
    </div>
  );
};

export default MBTIResult;
