import React, { useEffect, useRef } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';

import { useEntityContext } from '../../context';

if (isDevelopment()) {
  addFetchMock('entity:getHealth', () => 200);
  addFetchMock('entity:getMaxHealth', () => 200);
}

export const EntityHealth = () => {
  const { entity } = useEntityContext();

  const healthInputRef = useRef<HTMLInputElement>(null);
  const maxHealthInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNui<number>('entity:getHealth', entity)
      .then(result => {
        if (!result || !healthInputRef.current) return;

        healthInputRef.current.value = String(result);
      })
      .catch(console.error);

    fetchNui<number>('entity:getMaxHealth', entity)
      .then(result => {
        if (!result || !maxHealthInputRef.current) return;

        maxHealthInputRef.current.value = String(result);
      })
      .catch(console.error);
  }, [entity]);

  const handleChangeHealth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);

    fetchNui('entity:setHealth', { entity, value }).catch(console.error);
  };

  const handleChangeMaxHealth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);

    fetchNui('entity:setMaxHealth', { entity, value }).catch(console.error);
  };

  return (
    <main className="flex mt-2 flex-col">
      <Input ref={healthInputRef} type="number" label="Health" onChange={handleChangeHealth} />
      <Input ref={maxHealthInputRef} type="number" label="Max Health" onChange={handleChangeMaxHealth} />
    </main>
  );
};
