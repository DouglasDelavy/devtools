import { useEffect, useRef, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';
import { Accordion } from '@lib/components/accordion';
import { Button } from '@lib/components/button';
import { Switch } from '@lib/components/switch';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

import { EntityContext } from './context';

import { EntityAlpha } from './components/alpha';
import { EntityTransform } from './components/transform';
import { EntityPhysics } from './components/physics';
import { EntityHealth } from './components/health';
import { EntityLod } from './components/lod';

export const EntityScreen = () => {
  const [entity, setEntity] = useState(0);

  const freezeInputRef = useRef<HTMLInputElement>(null);
  const visibleInputRef = useRef<HTMLInputElement>(null);
  const collisionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNui<number>('menu:playerPedId')
      .then(playerPed => {
        if (!playerPed) return;

        setEntity(playerPed);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchNui<boolean>('entity:getFreeze', entity)
      .then(result => {
        if (!result || !freezeInputRef.current) return;

        freezeInputRef.current.checked = result;
      })
      .catch(console.error);

    fetchNui<boolean>('entity:getVisible', entity)
      .then(result => {
        if (!result || !visibleInputRef.current) return;

        visibleInputRef.current.checked = result;
      })
      .catch(console.error);

    fetchNui<boolean>('entity:getCollision', entity)
      .then(result => {
        if (!result || !collisionInputRef.current) return;

        collisionInputRef.current.checked = result;
      })
      .catch(console.error);
  }, [entity]);

  const handleDeleteEntity = (): void => {
    fetchNui('entity:delete', entity);
  };

  const handleChangeEntity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEntity(Number(e.target.value));
  };

  const handleChangeFreezed = (value: boolean): void => {
    fetchNui('entity:setFreeze', { entity, value });
  };

  const handleChangeVisible = (value: boolean): void => {
    fetchNui('entity:setVisible', { entity, value });
  };

  const handleChangeCollision = (value: boolean): void => {
    fetchNui('entity:setCollision', { entity, value });
  };

  return (
    <EntityContext.Provider value={{ entity }}>
      <div className="w-full flex flex-col overflow-auto gap-2">
        <Input type="number" label="Entity Handle" value={entity} onChange={handleChangeEntity} />

        <div className="flex items-center flex-wrap gap-2">
          <Switch ref={freezeInputRef} label="Freezed" onCheckedChange={handleChangeFreezed} />
          <Switch ref={visibleInputRef} label="Visible" onCheckedChange={handleChangeVisible} />
          <Switch ref={collisionInputRef} label="Collision" onCheckedChange={handleChangeCollision} />

          <Restricted to={PERMISSIONS.ENTITY_DELETE}>
            <Button onClick={handleDeleteEntity}>Delete</Button>
          </Restricted>
        </div>

        <Accordion title="Transform">
          <EntityTransform />
        </Accordion>

        <Accordion title="Alpha">
          <EntityAlpha />w
        </Accordion>

        <Accordion title="Physics">
          <EntityPhysics />
        </Accordion>

        <Accordion title="Lod">
          <EntityLod />
        </Accordion>

        <Accordion title="Health">
          <EntityHealth />
        </Accordion>
      </div>
    </EntityContext.Provider>
  );
};
