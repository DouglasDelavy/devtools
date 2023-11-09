import XMLBuilder from 'xmlbuilder';

import { UI } from '@modules/ui';

type TimecycleSearchOptions = {
  name?: string;
  param?: string;
};

type TimecycleSearchModOptions = {
  timecycleName: string;
  modNameFilter: string;
};

type SetTimecycleModData = {
  timecycleName: string;
  modName: string;
  value1: number;
  value2: number;
};

type ToggleTimecycleModData = {
  timecycleName: string;
  modName: string;
  state: boolean;
};

type RemoveTimecycleModData = {
  timecycleName: string;
  modName: string;
  state: boolean;
};

type TimecycleModData = {
  index: number;
  name: string;

  value1: number;
  value2: number;
  default: number;
};

const getTimecycles = (options: TimecycleSearchOptions): string[] => {
  const numOfTimecycles = GetTimecycleModifierCount();

  const filteredTimecycles: string[] = [];

  for (let index = 0; index < numOfTimecycles; ++index) {
    const timecycleName = GetTimecycleModifierNameByIndex(index);

    if (options.name && !timecycleName.startsWith(options.name)) continue;

    filteredTimecycles.push(timecycleName);
  }

  return filteredTimecycles;
};

const applyTimecycle = (timecycleName: string): void => {
  SetTimecycleModifier(timecycleName);
  SetTimecycleModifierStrength(1.0);
};

const clearTimecycle = (): void => {
  ClearTimecycleModifier();
};

const getTimecycleMods = (options: TimecycleSearchModOptions): TimecycleModData[] => {
  const mods: TimecycleModData[] = [];

  const numOfTimecyclesMods = GetTimecycleModifierVarCount(options.timecycleName);

  for (let index = 0; index < numOfTimecyclesMods; ++index) {
    const modName = GetTimecycleModifierVarNameByIndex(options.timecycleName, index);

    if (options.modNameFilter && !modName.startsWith(options.modNameFilter)) continue;

    const defaultValue = GetTimecycleVarDefaultValueByIndex(index);
    const [success, value1, value2] = GetTimecycleModifierVar(options.timecycleName, modName);

    if (!success) continue;

    mods.push({ index, name: modName, default: defaultValue, value1, value2 });
  }

  return mods;
};

const setTimecycleMod = ({ timecycleName, modName, value1, value2 }: SetTimecycleModData): void => {
  if (!DoesTimecycleModifierHasVar(timecycleName, modName)) return;

  SetTimecycleModifierVar(timecycleName, modName, value1, value2);
};

const toggleTimecycleMod = ({ timecycleName, modName, state }: ToggleTimecycleModData): void => {
  if (state) {
    SetTimecycleModifierVar(timecycleName, modName, 1.0, 1.0);
  } else {
    RemoveTimecycleModifierVar(timecycleName, modName);
  }
};

const removeTimecycleMod = ({ timecycleName, modName }: RemoveTimecycleModData): void => {
  RemoveTimecycleModifierVar(timecycleName, modName);
};

const generateXML = (timecycleName: string): string => {
  const root = XMLBuilder.create('timecycle_modifier_data');

  root.att('version', '1.000000');

  const numOfTimecyclesMods = GetTimecycleModifierVarCount(timecycleName);
  const mod = root.element('modifier', { name: timecycleName, numMods: numOfTimecyclesMods, userFlags: 0 });

  for (let index = 0; index < numOfTimecyclesMods; ++index) {
    const modName = GetTimecycleModifierVarNameByIndex(timecycleName, index);
    const [success, value1, value2] = GetTimecycleModifierVar(timecycleName, modName);

    if (!success) continue;

    mod.element(modName, undefined, `${value1.toFixed(3)} ${value2.toFixed(3)}`);
  }

  return root.end({ pretty: true });
};

const start = (): void => {
  UI.register('timecycle:apply', applyTimecycle);
  UI.register('timecycle:clear', clearTimecycle);

  UI.register('timecycle:search', getTimecycles);
  UI.register('timecycle:generateXML', generateXML);

  UI.register('timecycle:mod:search', getTimecycleMods);
  UI.register('timecycle:mod:modifier', setTimecycleMod);
  UI.register('timecycle:mod:toggle', toggleTimecycleMod);
  UI.register('timecycle:mod:remove', removeTimecycleMod);
};

const shutdown = (): void => {
  UI.unregister('timecycle:mod:remove');
  UI.unregister('timecycle:mod:toggle');
  UI.unregister('timecycle:mod:modifier');
  UI.unregister('timecycle:mod:search');

  UI.unregister('timecycle:search');
  UI.unregister('timecycle:generateXML');

  UI.unregister('timecycle:clear');
  UI.unregister('timecycle:apply');
};

export const Timecycle = {
  start,
  shutdown,
};
