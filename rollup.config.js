import fs from 'fs';
import childProcess from 'child_process';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import builtins from 'builtin-modules'
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const serve = () => ({
	writeBundle() {
		const ref = '__rollup_serve_child_process_reference__';
		if (process[ref]) {
			process[ref].kill();
		}
		process[ref] = childProcess.spawn('npm', ['run', 'start', '--', '--dev'], {
			stdio: ['ignore', 'inherit', 'inherit'],
			shell: true
		});
	}
});

const server = {
	input: 'src/server/index.js',
	output: {
		file: 'build/server/index.js',
		format: 'cjs'
	},
	plugins: [ 
		resolve(), 
		commonjs(),
		!production && serve() 
	],
	watch: {
		clearScreen: false
	},
	external: builtins 
};

const client = {
	input: 'src/client/main.js',
	output: {
		sourcemap: true, 
		format: 'iife',
		name: 'app',
		file: 'build/client/compiled/bundle.js'
	},
	plugins: [
		svelte({
			dev: !production,
			css: css => {
				css.write('bundle.css');
			}
		}),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		!production && livereload({
			watch: 'build',
			verbose: true,
			https: {
				key: fs.readFileSync('build/server/ssl/private/server.key'),
				cert: fs.readFileSync('build/server/ssl/certs/server.crt')
			}
		  }),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

export default [server, client];
