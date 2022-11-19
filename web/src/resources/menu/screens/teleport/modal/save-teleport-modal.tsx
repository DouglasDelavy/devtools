import { useEffect, useRef } from 'react';

import { fetchNui } from '@lib/nui';
import { parseFloatArray } from '@lib/utils/parser';
import { Button } from '@lib/components/button';
import { Input } from '@lib/components/input';

type SaveTeleportModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Teleport.CreateItem) => void;
};

export const SaveTeleportModal = ({ open, onClose, onSubmit }: SaveTeleportModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const coordsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNui<number[]>('teleport:getCoords')
      .then(result => {
        if (!result || !coordsInputRef.current) return;

        coordsInputRef.current.value = `${result[0].toFixed(2)}, ${result[1].toFixed(2)}, ${result[2].toFixed(2)}`;
      })
      .catch(console.error);
  }, [open]);

  const handleSubmit = (): void => {
    if (!nameInputRef.current || !coordsInputRef.current) return;

    onSubmit({
      name: nameInputRef.current.value,
      coords: parseFloatArray(coordsInputRef.current.value),
    });
  };

  const handleClose = (): void => {
    if (!onClose) return;

    onClose();
  };

  return open ? (
    <div className="absolute inset-0 p-10 w-screen h-screen flex justify-end">
      <div
        className="w-1/4 flex items-center justify-center bg-neutral-900 bg-opacity-75 transition-opacity"
        onClick={handleClose}
      >
        <div className="w-10/12 p-2 bg-neutral-800 flex flex-col gap-2" onClick={e => e.stopPropagation()}>
          <Input ref={nameInputRef} type="text" label="Name" />
          <Input ref={coordsInputRef} type="text" label="Coords" />

          <div className="flex gap-2 justify-end">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
