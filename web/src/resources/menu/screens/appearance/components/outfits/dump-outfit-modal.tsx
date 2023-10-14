import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Button } from '@lib/components/button';
import { TextArea } from '@lib/components/text-area';

import { useMenuContext } from '../../../../context';

type DumpOutfitModalProps = {
  outfitHash: number;

  open: boolean;
  onClose: () => void;
};

export const DumpOutfitModal = ({ outfitHash, open, onClose }: DumpOutfitModalProps) => {
  const [outfit, setOutfit] = useState<Appearance.Outfit>();
  const { maximize } = useMenuContext();

  const fetch = (): void => {
    fetchNui<Appearance.Outfit>('appearance:getOutfit', outfitHash)
      .then(result => {
        if (!result) return;

        setOutfit(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!open) return;

    fetch();
  }, [open]);

  const handleClose = (): void => {
    if (!onClose) return;

    onClose();
  };

  const data = {
    components: outfit?.components.map(component => ({
      component_id: component.eCompType,
      drawable: component.drawableIndex,
      texture: component.textureIndex,
    })),

    props: outfit?.props.map(prop => ({
      prop_id: prop.eAnchorPoint,
      drawable: prop.propIndex,
      texture: prop.textureIndex,
    })),
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
          className={`${maximize ? 'w-10/12' : 'w-2/4'} p-2 bg-neutral-800 flex flex-col gap-2`}
          onClick={e => e.stopPropagation()}
        >
          <TextArea rows={20} defaultValue={JSON.stringify(data, null, 2)} />

          <div className="flex gap-2 justify-end">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
