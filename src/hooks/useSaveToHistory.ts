import { useEffect } from 'react';
import { useStore } from '../store';

function padNumber(num: number): string {
  return String(num).padStart(2, '0');
}

function getCurrentTimestamp(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const useSaveToHistory = () => {
  const { history, setHistory } = useStore();

  useEffect(() => {
    const historyString = localStorage.getItem('history');
    if (historyString) {
      setHistory(JSON.parse(historyString));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history])

  const writeToHistory = (word: string, result: string) => {
    const newHistoryItem = {
      word,
      result,
      timestamp: getCurrentTimestamp()
    };

    setHistory([...history, newHistoryItem]);

    if (word && result) {
      setHistory([...history, newHistoryItem]);
    }
  };

  return { writeToHistory };
};
