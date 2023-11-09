import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { Input } from '@lib/components/input';
import { addFetchMock, fetchNui } from '@lib/nui';
import { isDevelopment } from '@lib/env';

import { useTimecycleContext } from './context';

type SearchOptions = {
  name?: string;
  param?: string;
};

if (isDevelopment()) {
  addFetchMock('timecycle:search', (options: SearchOptions) => {
    const timecycles = [];

    for (let i = 0; i < 100; ++i) {
      const timecycleName = `underwater_${i}`;

      if (options.name && !timecycleName.startsWith(options.name)) continue;

      timecycles.push(timecycleName);
    }

    return timecycles;
  });
}

export const TimecycleList = () => {
  const { selectTimecycle } = useTimecycleContext();

  const [timecycles, setTimecycles] = useState<string[]>([]);

  const fetchTimecycles = (searchOptions?: SearchOptions): void => {
    fetchNui<string[]>('timecycle:search', searchOptions).then(result => {
      if (!result) return;

      setTimecycles(result);
    });
  };

  const handleNameSearchChange = debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    fetchTimecycles({ name: value });
  }, 100);

  const handleSelectTimecycle = (timecycleName: string): void => {
    selectTimecycle(timecycleName);
  };

  useEffect(() => {
    fetchTimecycles();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 overflow-hidden">
      <header>
        <Input label="Search by name" onChange={handleNameSearchChange} />
      </header>

      <div className="flex flex-col gap-1 overflow-auto">
        {timecycles.map(timecycleName => (
          <div
            key={timecycleName}
            onClick={() => handleSelectTimecycle(timecycleName)}
            className="bg-neutral-800 px-1 hover:bg-neutral-800/70 cursor-pointer"
          >
            <p className="text-sm ">{timecycleName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
