import { useRef, useState } from 'react';

import { Input } from '@lib/components/input';
import { Select } from '@lib/components/select';

import { WEATHER_TYPE_OPTIONS } from './constants';
import { Button } from '@lib/components/button';
import { fetchNui } from '@lib/nui';

const DEFAULT_TRANSITION_TIME_IN_SECONDS = 0;

export const WorldWeather = () => {
  const [weatherType, setWeatherType] = useState<string>();

  const transitionInputRef = useRef<HTMLInputElement>(null);

  const handleWeatherTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setWeatherType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    fetchNui('world:setWeather', {
      weatherType,
      transitionTimeInSeconds: Number(transitionInputRef.current?.value),
    }).catch(console.error);
  };

  return (
    <form className="flex mt-2 flex-col gap-1" onSubmit={handleSubmit}>
      <Select label="Type" options={WEATHER_TYPE_OPTIONS} onChange={handleWeatherTypeChange} />

      <Input
        type="number"
        label="Transition In Seconds"
        ref={transitionInputRef}
        defaultValue={DEFAULT_TRANSITION_TIME_IN_SECONDS}
      ></Input>

      <div className="mt-1 flex justify-end items-center">
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};
