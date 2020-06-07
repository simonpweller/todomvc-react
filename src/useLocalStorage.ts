import { useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialState: T
): [T, (state: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialState;
  });
  const setStateAndStore = (newState: T) => {
    localStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  };
  return [state, setStateAndStore];
};

export default useLocalStorage;
