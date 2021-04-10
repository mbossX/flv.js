import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import serve from 'rollup-plugin-serve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';

const PRODUCTION = process.env.NODE_ENV !== 'development';

// rollup.config.js
const config = {
  input: 'src/index.js',
  output: {
    name: 'flvjs',
    file: 'dist/flv.js',
    format: 'umd'
  },
  plugins: [
    alias({
      resolve: ['.js']
    }),
    nodePolyfills(),
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    eslint(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};

if (PRODUCTION) {
  config.plugins.push(terser());
} else {
  config.plugins.push(serve({
    port: 8080,
    contentBase: ['']
  }));
}

export default config;
