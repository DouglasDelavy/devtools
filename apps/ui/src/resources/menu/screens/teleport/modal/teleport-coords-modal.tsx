import { useRef } from 'react';

import { Button } from '@lib/components/button';
import { Input } from '@lib/components/input';
import { parseFloatArray } from '@lib/utils/parser';

type TeleportCoordsModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (coords: number[]) => void;
};

export const TeleportCoordsModal = ({ open, onClose, onSubmit }: TeleportCoordsModalProps) => {
  const coordsInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (): void => {
    if (!coordsInputRef.current) return;

    onSubmit(parseFloatArray(coordsInputRef.current.value));
    handleClose();
  };

  const handleClose = (): void => {
    if (!onClose) return;

    onClose();
  };

  return open ? (
    <div className="absolute w-full inset-0 flex justify-end bg-neutral-900 bg-opacity-75 transition-opacity">
      <div className={`w-full flex items-center justify-center `} onClick={handleClose}>
        <div className={`w-1/2 max-w-xl p-2 bg-neutral-800 flex flex-col gap-2`} onClick={e => e.stopPropagation()}>
          <Input ref={coordsInputRef} type="text" label="Coords" />

          <div className="flex gap-2 justify-end">
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
