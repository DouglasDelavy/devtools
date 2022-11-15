import { Permission } from '@modules/permission';

const RESOURCE_NAME = GetCurrentResourceName();

setTimeout(() => {
  Permission.start();
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  Permission.shutdown();
});
