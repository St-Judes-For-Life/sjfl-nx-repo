import { useEffect, useRef, useState } from 'react';

export function useCountdown(count: number, onComplete?: VoidFunction) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(count);

  const stopCountdown = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const restart = () => {
    setSecondsLeft(count);
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (secondsLeft === 0) {
        onComplete?.();

        if (timer.current) {
          clearTimeout(timer.current);
        }

        return;
      }
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [onComplete, secondsLeft]);

  return { secondsLeft, restart, stopCountdown };
}
