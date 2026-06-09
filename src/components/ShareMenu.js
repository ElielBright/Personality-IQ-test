import { useState } from 'react';

const ShareMenu = ({ type, data }) => {
  const [status, setStatus] = useState(null);

  const handleShare = async () => {
    const { shareResults } = await import('../utils/sharing');
    const result = await shareResults(type, data);
    setStatus(result);
    setTimeout(() => setStatus(null), 2500);
  };

  const statusMessages = {
    shared: '✓ Shared successfully!',
    copied: '✓ Copied to clipboard!',
    cancelled: 'Sharing cancelled',
    unsupported: 'Could not share. Try copying manually.'
  };

  return (
    <div className="share-container">
      <button onClick={handleShare} className="share-button">
        <span className="share-icon">↗</span>
        Share Results
      </button>
      {status && (
        <span className={`share-status ${status === 'shared' || status === 'copied' ? 'share-status-success' : ''}`}>
          {statusMessages[status]}
        </span>
      )}
    </div>
  );
};

export default ShareMenu;
