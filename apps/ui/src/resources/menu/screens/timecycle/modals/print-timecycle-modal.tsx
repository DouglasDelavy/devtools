import { Button } from '@lib/components/button';
import { TextArea } from '@lib/components/text-area';
import { useEffect, useRef } from 'react';
import { useTimecycleContext } from '../context';
import { fetchNui } from '@lib/nui';

type PrintTimecycleModalProps = {
  open: boolean;
  onClose: () => void;
};

export const PrintTimecycleModal = ({ open, onClose }: PrintTimecycleModalProps) => {
  const { selectedTimecycle } = useTimecycleContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const fetchXMLContent = (): void => {
    if (!selectedTimecycle) return;

    fetchNui<string>('timecycle:generateXML', selectedTimecycle).then(result => {
      if (!result) return;

      if (textAreaRef.current) {
        textAreaRef.current.value = result;
      }
    });
  };

  useEffect(() => {
    if (!open) return;

    fetchXMLContent();
  }, [open]);

  const handleClose = (): void => {
    if (!onClose) return;

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="w-full absolute inset-0 flex justify-end">
      <div className="w-full flex items-center justify-center p-10 bg-neutral-900 bg-opacity-75 transition-opacity">
        <div className="w-10/12 p-2 h-full flex flex-col gap-2 bg-neutral-800 rounded-md">
          <header className="flex justify-between bg-neutral-800">
            <p className="text-neutral-200 font-bold text-lg">{selectedTimecycle}</p>

            <Button onClick={handleClose}>Close</Button>
          </header>

          <TextArea ref={textAreaRef} readOnly className="h-full bg-neutral-800 resize-none" />
        </div>
      </div>
    </div>
  );
};
