import { Log } from '@modules/logger';
import { UI } from 'modules/ui';

const run = (snippet: string): unknown => {
  try {
    return new Function(`return ${snippet}`)();
  } catch (e) {
    return e.toString();
  }
};

const command = (source: number, args: string[], raw: string): void => {
  const snippet = raw.substring(5, raw.length);
  const result = run(snippet);

  console.log(result);
};

const start = (): void => {
  RegisterCommand('crun', command, false);
  UI.register('console:run', run);

  Log.debug(`[RUNCODE] module started`);
};

const shutdown = (): void => {
  Log.debug(`[RUNCODE] module destroyed`);
};

export const RunCode = {
  run,
  start,
  shutdown,
};
