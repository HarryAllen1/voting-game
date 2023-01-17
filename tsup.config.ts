import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	entry: ['server/**/*.ts', '!server/**/*.d.ts'],
	outDir: 'dist',
	format: ['esm'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'esnext',
	bundle: false,
	shims: false,
	keepNames: true,
	splitting: false,
});
