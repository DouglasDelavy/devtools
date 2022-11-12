import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';
import { Accordion } from '@lib/components/accordion';

import { EntityContext } from './context';

import { EntityAlpha } from './components/alpha';
import { EntityTransform } from './components/transform';
import { EntityPhysics } from './components/physics';

export const EntityScreen = () => {
  const [entity, setEntity] = useState(0);

  useEffect(() => {
    fetchNui<number>('menu:playerPedId')
      .then(playerPed => {
        if (!playerPed) return;

        setEntity(playerPed);
      })
      .catch(console.error);
  }, []);

  const handleChangeEntity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEntity(Number(e.target.value));
  };

  return (
    <EntityContext.Provider value={{ entity }}>
      <div className="w-full flex flex-col overflow-auto gap-2">
        <Input type="number" label="Entity Handle" value={entity} onChange={handleChangeEntity} />

        <Accordion title="Transform">
          <EntityTransform />
        </Accordion>

        <Accordion title="Alpha">
          <EntityAlpha />
        </Accordion>

        <Accordion title="Physics">
          <EntityPhysics />
        </Accordion>
      </div>
    </EntityContext.Provider>
  );
};
