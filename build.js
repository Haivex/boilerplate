const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const serveConfig = {
  servedir: 'build',
  port: 8000,
};

const bundlerConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  loader: {
    '.png': 'dataurl',
    '.svg': 'text',
  },
  outdir: 'build',
  plugins: [],
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
};

/* eslint-disable no-console */

if (isWatch) {
  esbuild.serve(serveConfig, bundlerConfig).catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', err);
    process.exit(1);
  });
  console.log('Watching...');
} else {
  esbuild.build(bundlerConfig).catch(() => {
    process.exit(1);
  });
  console.log('\x1b[32m%s\x1b[0m', 'Build succeeded');
}

// {
//   onRebuild(error) {
//     /* eslint-disable */
//     if (error) {
//       console.log('\x1b[31m%s\x1b[0m', 'Watch build failed:');
//       console.error(error);
//     }
//     else console.log('\x1b[32m%s\x1b[0m', 'Watch build succeeded');
//     /* eslint-enable */
//   },
// },
