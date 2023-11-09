import { useState } from 'react';

import { TimecycleList } from './timecycle-list';
import { TimecycleContext } from './context';
import { TimecycleProperties } from './timecycle-properties';
import { PrintTimecycleModal } from './modals/print-timecycle-modal';

export const TimecycleScreen = () => {
  const [selectedTimecycle, setSelectedTimecycle] = useState<string>();

  const [isPrintTimecycleModalOpen, setIsPrintTimecycleModalOpen] = useState(false);

  const selectTimecycle = (timecycleName: string): void => {
    setSelectedTimecycle(timecycleName);
  };

  const clearTimecycle = (): void => {
    setSelectedTimecycle(undefined);
  };

  const openPrintTimecycleModal = (): void => {
    setIsPrintTimecycleModalOpen(true);
  };

  const closePrintTimecycleModal = (): void => {
    setIsPrintTimecycleModalOpen(false);
  };

  return (
    <div className="w-full h-full flex overflow-hidden">
      <TimecycleContext.Provider
        value={{
          selectedTimecycle: selectedTimecycle,
          selectTimecycle: selectTimecycle,
          clearTimecycle: clearTimecycle,
          openPrintTimecycleModal: openPrintTimecycleModal,
          closePrintTimecycleModal: closePrintTimecycleModal,
        }}
      >
        {selectedTimecycle ? <TimecycleProperties /> : <TimecycleList />}

        <PrintTimecycleModal open={isPrintTimecycleModalOpen} onClose={closePrintTimecycleModal} />
      </TimecycleContext.Provider>
    </div>
  );
};
