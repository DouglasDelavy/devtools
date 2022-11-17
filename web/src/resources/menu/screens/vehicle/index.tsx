import { useEffect, useState } from 'react';

import { fetchNui } from '@lib/nui';
import { Input } from '@lib/components/input';
import { Accordion } from '@lib/components/accordion';
import { Button } from '@lib/components/button';

import { Restricted } from '../../components/restricted';
import { PERMISSIONS } from '../../permissions';

import { VehicleCreate } from './components/create';
import { VehicleContext } from './context';

export const VehicleScreen = () => {
  const [vehicle, setVehicle] = useState(0);

  useEffect(() => {
    fetchNui<number>('vehicle:getPedIsIn')
      .then(vehicleIndex => {
        if (!vehicleIndex) return;

        setVehicle(vehicleIndex);
      })
      .catch(console.error);
  }, []);

  const handleDeleteEntity = (): void => {
    fetchNui('entity:delete', vehicle);
  };

  const handleChangeVehicle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVehicle(Number(e.target.value));
  };

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle }}>
      <div className="w-full flex flex-col gap-2">
        <Input type="number" label="Vehicle Index" value={vehicle} onChange={handleChangeVehicle} />

        <div className="flex justify-end">
          <Restricted to={PERMISSIONS.ENTITY_DELETE}>
            <Button onClick={handleDeleteEntity}>Delete</Button>
          </Restricted>
        </div>

        <Restricted to={PERMISSIONS.VEHICLE_CREATE}>
          <Accordion title="Create Vehicle">
            <VehicleCreate />
          </Accordion>
        </Restricted>
      </div>
    </VehicleContext.Provider>
  );
};
