import { Log } from '../utils/logger';

const run = (snippet: string): unknown => {
  try {
    return new Function(`return ${snippet}`)();
  } catch (e) {
    return e.toString();
  }
};

const start = (): void => {
  RegisterCommand(
    'crun',
    (source: number, args: string[], raw: string) => {
      const snippet = raw.substring(5, raw.length);
      const result = run(snippet);

      console.log(result);
    },
    false,
  );

  Log.debug(`[RUNCODE] module started`);
};

const destroy = (): void => {
  Log.debug(`[RUNCODE] module destroyed`);
};

export const RunCode = {
  run,
  start,
  destroy,
};
