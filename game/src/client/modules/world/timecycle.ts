import { UI } from '@modules/ui';

const setTimecycle = (name: string): void => {
  ClearTimecycleModifier();
  SetTimecycleModifier(name);
};

const setTimecycleStrength = (strength: number): void => {
  SetTimecycleModifierStrength(strength);
};

const start = (): void => {
  UI.register('world:setTimecycle', setTimecycle);
  UI.register('world:setTimecycleStrength', setTimecycleStrength);
};

const shutdown = (): void => {
  //TODO
};

export const WorldTimecycle = {
  start,
  shutdown,
};
