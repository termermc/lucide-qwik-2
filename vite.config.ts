import { defineConfig } from 'vite'
import { qwikVite } from '@qwik.dev/core/optimizer'

export default defineConfig(() => {
	return {
		build: {
			target: 'esnext',
			lib: {
				entry: './src/index.ts',
				formats: ['es'],
				fileName: (format) =>
					`index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
			},
			rolldownOptions: {
				output: {
					preserveModules: true,
					preserveModulesRoot: 'src',
					entryFileNames: '[name].qwik.js',
					chunkFileNames: '[name]-[hash].qwik.js',
				},
			},
		},
		plugins: [qwikVite()],
	}
})
