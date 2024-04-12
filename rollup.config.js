import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

import pkg from './package.json';

const commonjsOptions = {
    include: 'node_modules/**',
};

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: false,
            inlineDynamicImports: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: false,
            inlineDynamicImports: true,
        },
    ],
    external: [/@babel\/runtime/],
    plugins: [
        json(),
        external(),
        url({ exclude: ['**/*.svg'] }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            plugins: ["@babel/plugin-transform-runtime"],
        }),
        resolve(),
        typescript({
            compilerOptions: {
                outDir: 'dist'
            }
        }),
        commonjs(commonjsOptions),
    ],
};
