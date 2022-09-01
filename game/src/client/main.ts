import { RunCode } from './modules/run-code';

const RESOURCE_NAME = GetCurrentResourceName();

setTimeout(() => {
  RunCode.start();
}, 0);

on('onResourceStop', (resourceName: string) => {
  if (resourceName !== RESOURCE_NAME) return;

  RunCode.destroy();
});
