import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';

const INITIAL_STATE = {
  randomVehicle: 1,
  parkedVehicle: 1,
  ped: 1,
  vehicle: 1,
  scenarioPed: 1,
};

type WorldDensity = typeof INITIAL_STATE;

export const WorldDensity = () => {
  const [density, setDensity] = useState(INITIAL_STATE);

  useEffect(() => {
    fetchNui<WorldDensity>('world:getDensity')
      .then(result => {
        if (!result) return;

        setDensity(result);
      })
      .catch(console.error);
  }, []);

  const handleChangePedDensity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const state = { ...density, ped: value };

    setDensity(state);
    emit(state);
  };

  const handleChangeScenarioPedDensity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const state = { ...density, scenarioPed: value };

    setDensity(state);
    emit(state);
  };

  const handleChangeVehicleDensity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const state = { ...density, vehicle: value };

    setDensity(state);
    emit(state);
  };

  const handleChangeRandomVehicleDensity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const state = { ...density, randomVehicle: value };

    setDensity(state);
    emit(state);
  };

  const handleChangeParkedVehicleDensity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const state = { ...density, parkedVehicle: value };

    setDensity(state);
    emit(state);
  };

  const emit = (data: World.Density): void => {
    fetchNui('world:setDensity', data).catch(console.error);
  };

  return (
    <main className="flex mt-2 flex-col gap-1">
      <Input
        label="Ped"
        type="number"
        min={0.0}
        max={1.0}
        step={0.1}
        value={density.ped}
        onChange={handleChangePedDensity}
      />

      <Input
        label="Scenario Ped"
        type="number"
        min={0.0}
        max={1.0}
        step={0.1}
        value={density.scenarioPed}
        onChange={handleChangeScenarioPedDensity}
      />

      <Input
        label="Vehicle"
        type="number"
        min={0.0}
        max={1.0}
        step={0.1}
        value={density.vehicle}
        onChange={handleChangeVehicleDensity}
      />

      <Input
        label="Random Vehicle"
        type="number"
        min={0.0}
        max={1.0}
        step={0.1}
        value={density.randomVehicle}
        onChange={handleChangeRandomVehicleDensity}
      />

      <Input
        label="Parked Vehicle"
        type="number"
        min={0.0}
        max={1.0}
        step={0.1}
        value={density.parkedVehicle}
        onChange={handleChangeParkedVehicleDensity}
      />
    </main>
  );
};
