import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { ArrowInput } from '@lib/components/arrow-input';
import { Button } from '@lib/components/button';

const TATTOOS_ZONES = [
  { id: 0, label: 'Torso' },
  { id: 1, label: 'Head' },
  { id: 2, label: 'Left Arm' },
  { id: 3, label: 'Right Arm' },
  { id: 4, label: 'Left Leg' },
  { id: 5, label: 'Right Leg' },
  { id: 6, label: 'Unknown' },
  { id: 7, label: 'None' },
];

export const Tattoos = () => {
  const [tattoos, setTattoos] = useState<Record<number, Appearance.ShopPedTattoo[]>>();
  const [currentTattooIndex, setCurrentTattooIndex] = useState(0);

  const handleSetTattoo = (zone: number, index: number): void => {
    if (!tattoos) return;

    const tattoosInZone = tattoos[zone];
    if (!tattoosInZone) return;

    const tattoo = tattoosInZone[index];
    if (!tattoo) return;

    setCurrentTattooIndex(index);

    fetchNui('appearance:setTattoo', {
      collectionHash: tattoo.tattooCollectionHash,
      nameHash: tattoo.tattooNameHash,
    }).catch(console.error);
  };

  const handleApplyTattoo = (zone: number, index: number): void => {
    if (!tattoos) return;

    const tattoosInZone = tattoos[zone];
    if (!tattoosInZone) return;

    const tattoo = tattoosInZone[index];
    if (!tattoo) return;

    fetchNui('appearance:applyTattoo', {
      collectionHash: tattoo.tattooCollectionHash,
      nameHash: tattoo.tattooNameHash,
    }).catch(console.error);
  };

  const handleClearTattoos = (): void => {
    fetchNui('appearance:clearTattoos').catch(console.error);
  };

  const handleClearComponents = (): void => {
    fetchNui('appearance:clearPedComponents').catch(console.error);
  };

  const fetchTattoos = (): void => {
    fetchNui<Record<number, Appearance.ShopPedTattoo[]>>('appearance:getTattoos')
      .then(result => {
        if (!result) return;

        setTattoos(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchTattoos();
  }, []);

  return (
    <div className="flex flex-col gap-2 pb-1">
      {tattoos && (
        <div>
          {TATTOOS_ZONES.map(zone => (
            <div className="flex items-end gap-2">
              <ArrowInput
                label={zone.label}
                min={0}
                max={tattoos[zone.id]?.length - 1}
                onChange={value => handleSetTattoo(zone.id, value)}
              />

              <Button onClick={() => handleApplyTattoo(zone.id, currentTattooIndex)}>Apply</Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 gap-2 flex justify-end">
        <Button onClick={handleClearTattoos}>Clear Tattoos</Button>
        <Button onClick={handleClearComponents}>Clear Components</Button>
      </div>
    </div>
  );
};
