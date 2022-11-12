import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { NumberInput } from '@lib/components/number-input';

import { useEntityContext } from '../../context';

export const EntityAlpha = () => {
  const { entity } = useEntityContext();

  const [alpha, setAlpha] = useState(255);

  useEffect(() => {
    fetchNui<number>('entity:getAlpha', entity)
      .then(result => {
        if (!result) return;

        setAlpha(result);
      })
      .catch(console.error);
  }, [entity]);

  const setEntityAlpha = (value: number): void => {
    setAlpha(value);

    fetchNui('entity:setAlpha', { entity, alpha }).catch(console.error);
  };

  return (
    <main className="flex mt-2 flex-col">
      <NumberInput label="Value" value={alpha} max={255} min={0} onChange={setEntityAlpha} />
    </main>
  );
};
