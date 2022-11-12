import { Accordion } from '@lib/components/accordion';
import { WorldDensity } from './components/density';

export const WorldScreen = () => {
  return (
    <div className="w-full flex flex-col overflow-auto gap-2">
      <Accordion title="Density">
        <WorldDensity />
      </Accordion>
    </div>
  );
};
