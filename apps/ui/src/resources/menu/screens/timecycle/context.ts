import { createContext, useContext } from 'react';

type TimecycleContextData = {
  selectedTimecycle?: string;
  selectTimecycle: (timecycleName: string) => void;
  clearTimecycle: () => void;

  openPrintTimecycleModal: () => void;
  closePrintTimecycleModal: () => void;
};

export const TimecycleContext = createContext({} as TimecycleContextData);

export const useTimecycleContext = (): TimecycleContextData => {
  return useContext(TimecycleContext);
};
