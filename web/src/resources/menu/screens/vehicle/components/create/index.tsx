import { useEffect, useMemo, useRef, useState } from 'react';

import { isDevelopment } from '@lib/env';
import { addFetchMock, fetchNui } from '@lib/nui';

import { Select } from '@lib/components/select';
import { CheckBox } from '@lib/components/checkbox';
import { Button } from '@lib/components/button';

import { useVehicleContext } from '../../context';

if (isDevelopment()) {
  addFetchMock('vehicle:getModels', () => ['bati', 'kuruma']);
}

export const VehicleCreate = () => {
  const { setVehicle } = useVehicleContext();

  const [models, setModels] = useState<string[]>([]);

  const selectModelRef = useRef<HTMLSelectElement>(null);
  const isDriverRef = useRef<HTMLInputElement>(null);
  const isNetworkedRef = useRef<HTMLInputElement>(null);
  const isScriptHostRef = useRef<HTMLInputElement>(null);
  const isServerSetterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchNui<string[]>('vehicle:getModels')
      .then(result => {
        if (!result) return;

        setModels(result);
      })
      .catch(console.error);
  }, []);

  const selectOptions = useMemo(() => models.map(model => ({ value: model, label: model })), [models]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!selectModelRef.current?.value) return;

    const data = {
      model: selectModelRef.current?.value,
      inside: isDriverRef.current?.checked,
      isNetworked: isNetworkedRef.current?.checked,
      isScriptHost: isScriptHostRef.current?.checked,
      isServerSetter: isServerSetterRef.current?.checked,
    };

    fetchNui<number>('vehicle:create', data)
      .then(vehicleIndex => {
        if (!vehicleIndex) return;

        setVehicle(vehicleIndex);
      })
      .catch(console.error);
  };

  return (
    <form className="h-full flex py-2 flex-col gap-1" onSubmit={handleSubmit}>
      <Select ref={selectModelRef} options={selectOptions} />

      <div className="py-2 flex flex-wrap gap-2">
        <CheckBox ref={isDriverRef} label="isDriver" />
        <CheckBox ref={isNetworkedRef} label="isNetworked" />
        <CheckBox ref={isScriptHostRef} label="isScriptHost" />
        <CheckBox ref={isServerSetterRef} label="isServerSetter" />
      </div>

      <div className="mt-1 flex justify-end items-center">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};
