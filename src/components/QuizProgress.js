const QuizProgress = ({ current, total }) => {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="progress-label">Progress</span>
        <span className="progress-count">{current} of {total}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default QuizProgress;
