import { useEffect, useMemo, useState } from 'react';

import { Input } from '@lib/components/input';
import { Select } from '@lib/components/select';

import { fetchFile, fetchNui } from '@lib/nui';

const DEFAULT_TIMECYCLE_STRENGTH = 1.0;

export const WorldTimecycle = () => {
  const [timecycles, setTimecycles] = useState<string[]>([]);

  useEffect(() => {
    fetchFile<string[]>('data/timecycle.json')
      .then(timecycles => {
        if (!timecycles) return;

        setTimecycles(timecycles);
      })
      .catch(console.error);
  }, []);

  const handleChangeTimecycle = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    fetchNui('world:setTimecycle', e.target.value);
  };

  const handleChangeTimecycleStrength = (e: React.ChangeEvent<HTMLInputElement>): void => {
    fetchNui('world:setTimecycleStrength', parseFloat(e.target.value));
  };

  const selectOptions = useMemo(
    () => timecycles.map(timecycle => ({ label: timecycle, value: timecycle }), [timecycles]),
    [timecycles],
  );

  return (
    <div className="flex mt-2 flex-col gap-1">
      <Select label="Timecycle" options={selectOptions} onChange={handleChangeTimecycle} />

      <Input
        type="number"
        label="Timecycle Strength"
        min={0}
        max={1}
        step={0.1}
        defaultValue={DEFAULT_TIMECYCLE_STRENGTH}
        onChange={handleChangeTimecycleStrength}
      />
    </div>
  );
};
