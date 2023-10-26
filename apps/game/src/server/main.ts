import { Permission } from '@modules/permission';
import { Vehicle } from '@modules/vehicle';
import { Entity } from '@modules/entity';

const RESOURCE_NAME = GetCurrentResourceName();

setTimeout(() => {
  Permission.start();
  Entity.start();
  Vehicle.start();
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  Permission.shutdown();
  Entity.shutdown();
  Vehicle.shutdown();
});
