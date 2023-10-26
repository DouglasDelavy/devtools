import { useCallback, useEffect, useState } from 'react';

import { parseJSON } from '@lib/utils/json';

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const get = useCallback((): T => {
    const rawValue = localStorage.getItem(key);

    if (rawValue) {
      return parseJSON(rawValue) ?? initialValue;
    } else {
      return initialValue;
    }
  }, [key, initialValue]);

  const set: SetValue<T> = value => {
    const newValue = value instanceof Function ? value(storedValue) : value;

    localStorage.setItem(key, JSON.stringify(newValue));

    setStoredValue(newValue);
  };

  const [storedValue, setStoredValue] = useState<T>(get);

  useEffect(() => {
    setStoredValue(get());
  }, []);

  return [storedValue, set];
};
