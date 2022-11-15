import { Accordion } from '@lib/components/accordion';

import { PERMISSIONS } from '../../permissions';
import { Restricted } from '../../components/restricted';

import { WorldDensity } from './components/density';
import { WorldTime } from './components/time';
import { WorldWeather } from './components/weather';

export const WorldScreen = () => {
  return (
    <div className="w-full flex flex-col overflow-auto gap-2">
      <Restricted to={PERMISSIONS.WORLD_DENSITY}>
        <Accordion title="Density">
          <WorldDensity />
        </Accordion>
      </Restricted>

      <Restricted to={PERMISSIONS.WORLD_WEATHER}>
        <Accordion title="Weather">
          <WorldWeather />
        </Accordion>
      </Restricted>

      <Restricted to={PERMISSIONS.WORLD_TIME}>
        <Accordion title="Time">
          <WorldTime />
        </Accordion>
      </Restricted>
    </div>
  );
};
