const path = require('path');
const esbuild = require('esbuild');

const CLIENT_OPTIONS = {
  entryPoints: ['src/client/main.ts'],
  outfile: path.resolve('..', '..', 'dist', 'client.js'),
  bundle: true,
  platform: 'browser',
  target: 'es2016',
  write: true,
};

const SERVER_OPTIONS = {
  entryPoints: ['src/server/main.ts'],
  outfile: path.resolve('..', '..', 'dist', 'server.js'),
  bundle: true,
  platform: 'node',
  target: 'es2020',
  write: true,
};

const createRebuildCallback = identifier => {
  return (error, result) => {
    if (error) {
      console.error(`${identifier} watch build failed:`, error);
    } else {
      console.log(`${identifier} watch build succeeded:`, result);
    }
  };
};

const watch = () => {
  esbuild.build({ ...CLIENT_OPTIONS, watch: { onRebuild: createRebuildCallback('client') } });
  esbuild.build({ ...SERVER_OPTIONS, watch: { onRebuild: createRebuildCallback('server') } });
};

const build = () => {
  esbuild.build(CLIENT_OPTIONS);
  esbuild.build(SERVER_OPTIONS);
};

const run = () => {
  const args = process.argv.slice(2);

  // Build
  if (args[0] === '--build') {
    build();
    return;
  }

  // Watch
  if (args[0] === '--watch') {
    watch();
    return;
  }
};

run();
