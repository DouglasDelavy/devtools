import { Accordion } from '@lib/components/accordion';

import { WorldDensity } from './components/density';
import { WorldTime } from './components/time';
import { WorldWeather } from './components/weather';

export const WorldScreen = () => {
  return (
    <div className="w-full flex flex-col overflow-auto gap-2">
      <Accordion title="Density">
        <WorldDensity />
      </Accordion>

      <Accordion title="Weather">
        <WorldWeather />
      </Accordion>

      <Accordion title="Time">
        <WorldTime />
      </Accordion>
    </div>
  );
};
