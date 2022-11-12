declare namespace World {
  type Density = {
    randomVehicle: number;
    parkedVehicle: number;
    ped: number;
    vehicle: number;
    scenarioPed: number;
  };

  type Weather = {
    weatherType: string;
    transitionTimeInSeconds: number;
  };
}
