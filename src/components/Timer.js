import { useState, useEffect, useRef } from 'react';

const Timer = ({ initialSeconds, onExpire, running }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const expiredRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            if (!expiredRef.current) {
              expiredRef.current = true;
              onExpire();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onExpire, initialSeconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
    expiredRef.current = false;
  }, [initialSeconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className={`timer ${seconds <= 60 ? 'timer-warning' : ''}`}>
      <span className="timer-icon">⏱</span>
      <span className="timer-display">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
