import { useRef, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Button } from '@lib/components/button';
import { Input } from '@lib/components/input';
import { Switch } from '@lib/components/switch';

export const WorldTime = () => {
  const [freezed, setFreezed] = useState(false);

  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const handleFreezedChange = (value: boolean): void => {
    setFreezed(value);

    fetchNui('world:setFreeze', value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const hours = Number(hourInputRef.current?.value);
    const minutes = Number(minuteInputRef.current?.value);
    const seconds = Number(secondInputRef.current?.value);

    fetchNui('world:setTime', { hours, minutes, seconds });
  };

  return (
    <div className="flex flex-col gap-2">
      <form className="flex py-2 flex-col gap-1 border-b-2 border-neutral-500" onSubmit={handleSubmit}>
        <Input ref={hourInputRef} type="number" label="Hours" defaultValue={0} />
        <Input ref={minuteInputRef} type="number" label="Minutes" defaultValue={0} />
        <Input ref={secondInputRef} type="number" label="Seconds" defaultValue={0} />

        <div className="mt-1 flex justify-end items-center">
          <Button type="submit">Confirm</Button>
        </div>
      </form>

      <div className="py-2">
        <Switch label="freezed" checked={freezed} onCheckedChange={handleFreezedChange} />
      </div>
    </div>
  );
};
