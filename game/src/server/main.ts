import { Permission } from '@modules/permission';
import { Vehicle } from '@modules/vehicle';

const RESOURCE_NAME = GetCurrentResourceName();

setTimeout(() => {
  Permission.start();
  Vehicle.start();
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  Permission.shutdown();
  Vehicle.shutdown();
});
