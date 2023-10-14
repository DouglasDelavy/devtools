import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { ArrowInput } from '@lib/components/arrow-input';
import { Button } from '@lib/components/button';

const TATTOOS_ZONES = {
  torso: 0,
  head: 1,
  leftArm: 2,
  rightArm: 3,
  leftLeg: 4,
  rightLeg: 5,
  unknown: 6,
  none: 7,
};

export const Tattoos = () => {
  const [tattoos, setTattoos] = useState<Record<number, Appearance.ShopPedTattoo[]>>();

  const handleApply = (zone: number, index: number): void => {
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
          <ArrowInput
            label="Torso"
            min={0}
            max={tattoos[TATTOOS_ZONES.torso]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.torso, value)}
          />

          <ArrowInput
            label="Head"
            min={0}
            max={tattoos[TATTOOS_ZONES.head]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.head, value)}
          />

          <ArrowInput
            label="Left Arm"
            min={0}
            max={tattoos[TATTOOS_ZONES.leftArm]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.leftArm, value)}
          />

          <ArrowInput
            label="Right Arm"
            min={0}
            max={tattoos[TATTOOS_ZONES.rightArm]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.rightArm, value)}
          />

          <ArrowInput
            label="Left Leg"
            min={0}
            max={tattoos[TATTOOS_ZONES.leftLeg]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.leftLeg, value)}
          />

          <ArrowInput
            label="Right Leg"
            min={0}
            max={tattoos[TATTOOS_ZONES.rightLeg]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.rightLeg, value)}
          />

          <ArrowInput
            label="Unknowk"
            min={0}
            max={tattoos[TATTOOS_ZONES.unknown]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.unknown, value)}
          />

          <ArrowInput
            label="None"
            min={0}
            max={tattoos[TATTOOS_ZONES.none]?.length - 1}
            onChange={value => handleApply(TATTOOS_ZONES.none, value)}
          />
        </div>
      )}

      <div className="mt-2 gap-2 flex justify-end">
        <Button onClick={handleClearTattoos}>Clear Tattoos</Button>
        <Button onClick={handleClearComponents}>Clear Components</Button>
      </div>
    </div>
  );
};
