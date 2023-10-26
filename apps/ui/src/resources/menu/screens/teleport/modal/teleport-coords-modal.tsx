import { useRef } from 'react';

import { Button } from '@lib/components/button';
import { Input } from '@lib/components/input';
import { parseFloatArray } from '@lib/utils/parser';

import { useMenuContext } from '../../../context';

type TeleportCoordsModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (coords: number[]) => void;
};

export const TeleportCoordsModal = ({ open, onClose, onSubmit }: TeleportCoordsModalProps) => {
  const { maximize } = useMenuContext();

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
    <div className="absolute inset-0 p-10 w-screen h-screen flex justify-end">
      <div
        className={`${
          maximize ? 'w-1/4' : 'w-full'
        } flex items-center justify-center bg-neutral-900 bg-opacity-75 transition-opacity`}
        onClick={handleClose}
      >
        <div
          className={`${maximize ? 'w-10/12' : 'w-1/4'} p-2 bg-neutral-800 flex flex-col gap-2`}
          onClick={e => e.stopPropagation()}
        >
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
