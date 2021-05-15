const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

esbuild.build({
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
  watch: isWatch && {
    onRebuild(error) {
      /* eslint-disable */
      if (error) {
        console.log('\x1b[31m%s\x1b[0m', 'Watch build failed:');
        console.error(error);
      }
      else console.log('\x1b[32m%s\x1b[0m', 'Watch build succeeded');
      /* eslint-enable */
    },
  },
}).catch(() => {
  process.exit(1);
});

if (isWatch) {
  /* eslint-disable */
  console.log('Watching...');
  /* eslint-enable */
} else {
  /* eslint-disable */
  console.log('\x1b[32m%s\x1b[0m', 'Build succeeded');
  /* eslint-enable */
}
