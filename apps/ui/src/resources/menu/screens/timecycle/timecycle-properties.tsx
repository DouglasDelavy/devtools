import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AiFillCaretLeft, AiFillDelete } from 'react-icons/ai';

import { Button } from '@lib/components/button';
import { Input } from '@lib/components/input';

import { addFetchMock, fetchNui } from '@lib/nui';
import { isDevelopment } from '@lib/env';
import { NumberInput } from '@lib/components/number-input';
import { CheckBox } from '@lib/components/checkbox';

import { useTimecycleContext } from './context';

type TimecycleModData = {
  index: number;
  name: string;

  value1: number;
  value2: number;
  default: number;
};

type TimecycleModPropertiesProps = {
  mod: TimecycleModData;
  fetchMods: (modNameFilter?: string) => void;
};

if (isDevelopment()) {
  addFetchMock('timecycle:mod:search', ({ modNameFilter }) => {
    const mods: TimecycleModData[] = [];

    for (let i = 0; i < 50; ++i) {
      const modName = `mod_${i}`;

      if (modNameFilter && !modName.startsWith(modNameFilter)) continue;

      mods.push({ index: i, name: modName, value1: 0.1, value2: 0.1, default: 0.89 });
    }

    return mods;
  });
}

const TimecycleModProperties = ({ mod, fetchMods }: TimecycleModPropertiesProps) => {
  const { selectedTimecycle, selectTimecycle } = useTimecycleContext();

  const [value1, setValue1] = useState(mod.value1);
  const [value2, setValue2] = useState(mod.value2);

  const changeModProperties = (): void => {
    fetchNui('timecycle:mod:modifier', { timecycleName: selectedTimecycle, modName: mod.name, value1, value2 }).catch(
      console.error,
    );
  };

  const handleChangeValue1 = (value: number): void => {
    setValue1(value);

    changeModProperties();
  };

  const handleChangeValue2 = (value: number): void => {
    setValue2(value);

    changeModProperties();
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const state = event.target.checked;

    fetchNui('timecycle:mod:toggle', { timecycleName: selectedTimecycle, modName: mod.name, state }).catch(
      console.error,
    );
  };

  const handleRemove = (): void => {
    if (!selectedTimecycle) return;

    fetchNui('timecycle:mod:remove', { timecycleName: selectedTimecycle, modName: mod.name })
      .then(() => fetchMods())
      .catch(console.error);
  };

  return (
    <tr>
      <th className="max-w-[4rem] truncate overflow-hidden text-xs">{mod.name}</th>
      <th className="max-w-[1rem]">
        <NumberInput value={value1} onChange={handleChangeValue1} />
      </th>
      <th className="max-w-[1rem]">
        <NumberInput value={value2} onChange={handleChangeValue2} />
      </th>
      <th className="text-xs">{mod.default.toFixed(2)}</th>
      <th className="flex gap-1 items-center justify-center">
        <CheckBox defaultChecked onChange={handleToggle} />
        <Button onClick={handleRemove} className="px-1 py-1 2xl:px-1 2xl:py-1">
          <AiFillDelete />
        </Button>
      </th>
    </tr>
  );
};

export const TimecycleProperties = () => {
  const { selectedTimecycle, clearTimecycle, openPrintTimecycleModal } = useTimecycleContext();

  const [mods, setMods] = useState<TimecycleModData[]>([]);

  const clearAppliedTimecycle = (): void => {
    fetchNui('timecycle:clear').catch(console.error);
  };

  const handleApplyTimecycle = (): void => {
    fetchNui('timecycle:apply', selectedTimecycle).catch(console.error);
  };

  const handleClearSelectedTimecycle = (): void => {
    clearTimecycle();
  };

  const fetchMods = (modNameFilter?: string): void => {
    fetchNui<TimecycleModData[]>('timecycle:mod:search', { timecycleName: selectedTimecycle, modNameFilter }).then(
      result => {
        if (!result) return;

        setMods(result);
      },
    );
  };

  const handleModNameFilterChange = debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    fetchMods(value);
  }, 100);

  const handlePrintTimecycle = (): void => {
    openPrintTimecycleModal();
  };

  useEffect(() => {
    fetchMods();

    return () => {
      clearAppliedTimecycle();
    };
  }, []);

  if (!selectedTimecycle) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-auto">
      <div className="flex gap-1 justify-between">
        <div className="flex gap-1 items-center justify-center overflow-hidden">
          <Button onClick={handleClearSelectedTimecycle} className="px-1 py-1 2xl:px-2 2xl:py-1">
            <AiFillCaretLeft />
          </Button>

          <p className="text-base font-bold text-neutral-200 truncate">{selectedTimecycle}</p>
        </div>

        <div className="flex gap-1">
          <Button onClick={handleApplyTimecycle} className="px-1 py-1 2xl:px-2 2xl:py-1">
            Apply
          </Button>
          <Button onClick={handlePrintTimecycle} className="px-1 py-1 2xl:px-2 2xl:py-1">
            XML
          </Button>
        </div>
      </div>

      <div className="w-full flex items-end gap-1">
        <Input label="Filter Variable" onChange={handleModNameFilterChange} />
        <Button className="px-1 py-1 2xl:px-2 2xl:py-1">Add</Button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-xs">
            <th>Name</th>
            <th>Value1</th>
            <th>Value2</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {mods.map(mod => (
            <TimecycleModProperties key={mod.index} mod={mod} fetchMods={fetchMods} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
