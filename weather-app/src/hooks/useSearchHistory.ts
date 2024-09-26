import { useState, useEffect } from 'react';

const MAX_HISTORY = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addCityToHistory = (city: string) => {
    const updatedHistory = [city, ...history.filter((h) => h !== city)].slice(0, MAX_HISTORY);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return { history, addCityToHistory };
};
