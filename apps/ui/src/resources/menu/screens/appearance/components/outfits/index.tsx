import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { ArrowInput } from '@lib/components/arrow-input';
import { Button } from '@lib/components/button';
import { DumpOutfitModal } from './dump-outfit-modal';

export const Outfits = () => {
  const [outfitIndex, setOutfitIndex] = useState(-1);
  const [outfits, setOutfits] = useState<Appearance.ShopPedOutfit[]>([]);
  const [isDumpOutfitModalOpen, setIsDumpOutfitModalOpen] = useState(false);

  const outfit = outfits[outfitIndex];

  const handleChangeOutfit = (index: number): void => {
    setOutfitIndex(index);

    fetchNui('appearance:applyOutfit', outfits[index]).catch(console.error);
  };

  const handleOpenDumpOutfitModal = (): void => {
    setIsDumpOutfitModalOpen(true);
  };

  const handleCloseDumpOutfitModal = (): void => {
    setIsDumpOutfitModalOpen(false);
  };

  const fetch = (): void => {
    fetchNui<Appearance.ShopPedOutfit[]>('appearance:getOutfits')
      .then(result => {
        if (!result) return;

        setOutfits(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-2 pb-1">
      <ArrowInput
        label={outfit?.textLabel || 'Unknown'}
        min={-1}
        max={outfits.length - 1}
        onChange={handleChangeOutfit}
      />

      <div className="flex justify-end">
        <Button onClick={handleOpenDumpOutfitModal}>Dump</Button>
      </div>

      <DumpOutfitModal outfitHash={outfit?.hash} open={isDumpOutfitModalOpen} onClose={handleCloseDumpOutfitModal} />
    </div>
  );
};
