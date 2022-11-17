import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';
import { Accordion } from '@lib/components/accordion';
import { Button } from '@lib/components/button';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

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

  const handleDeleteEntity = (): void => {
    fetchNui('entity:delete', entity);
  };

  const handleChangeEntity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEntity(Number(e.target.value));
  };

  return (
    <EntityContext.Provider value={{ entity }}>
      <div className="w-full flex flex-col overflow-auto gap-2">
        <Input type="number" label="Entity Handle" value={entity} onChange={handleChangeEntity} />

        <div className="flex justify-end">
          <Restricted to={PERMISSIONS.ENTITY_DELETE}>
            <Button onClick={handleDeleteEntity}>Delete</Button>
          </Restricted>
        </div>

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
