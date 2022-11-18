import React, { useEffect, useRef } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';

import { useEntityContext } from '../../context';

if (isDevelopment()) {
  addFetchMock('entity:getLodDistance', () => 10);
}

export const EntityLod = () => {
  const { entity } = useEntityContext();

  const distanceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNui<number>('entity:getLodDistance', entity)
      .then(result => {
        if (!result || !distanceInputRef.current) return;

        distanceInputRef.current.value = String(result);
      })
      .catch(console.error);
  }, [entity]);

  const handleChangeDistance = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);

    fetchNui('entity:setLodDistance', { entity, value }).catch(console.error);
  };

  return (
    <main className="flex mt-2 flex-col">
      <Input ref={distanceInputRef} type="number" label="Lod Distance" onChange={handleChangeDistance} />
    </main>
  );
};
