import { createContext, useContext } from 'react';

type VehicleContextData = {
  vehicle: number;
  setVehicle: (vehicle: number) => void;
};

export const VehicleContext = createContext({} as VehicleContextData);

export const useVehicleContext = (): VehicleContextData => {
  return useContext(VehicleContext);
};
