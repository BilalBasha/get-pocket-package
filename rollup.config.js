import { babel } from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import linaria from '@linaria/rollup';
import css from 'rollup-plugin-css-only'
import image from '@rollup/plugin-image';
import copy from 'rollup-plugin-copy';

const config = {
  input: ['src/index.js'],
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    linaria({
      // include:['src/mod3.js'],
      // sourceMap: process.env.NODE_ENV !== 'production',
    }),
    css({
        output: 'styles.css'
    }),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    image(),
    copy({
      targets: [
        { src: 'src/assets/', dest: 'output/' },
      ]
    })
  ],
};

export default config;