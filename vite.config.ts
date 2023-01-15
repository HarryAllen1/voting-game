/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { extname } from 'node:path';
import { extractorSvelte, presetTypography, presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

const supportedExtensions = ['.png', '.jpg', '.jpeg'];

export default defineConfig({
	plugins: [
		imagetools({
			defaultDirectives: (url) => {
				const extension = extname(url.pathname);
				if (supportedExtensions.includes(extension)) {
					return new URLSearchParams({
						format: 'avif;webp;' + extension.slice(1),
						picture: 'true',
					});
				}
				return new URLSearchParams();
			},
		}),
		UnoCSS({
			extractors: [extractorSvelte],
			presets: [presetUno(), presetTypography()],
		}),
		sveltekit(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
	},
	build: {
		sourcemap: true,
	},
});
