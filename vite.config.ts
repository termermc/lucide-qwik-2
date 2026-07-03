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
			rollupOptions: {
				output: {
					preserveModules: true,
					preserveModulesRoot: 'src',
					// strongly recommend explicit patterns when preserveModules is on
					entryFileNames: '[name].js',
					chunkFileNames: '[name]-[hash].js',
					assetFileNames: '[name]-[hash][extname]',
					format: 'es',
				},
			},
		},
		plugins: [qwikVite()],
	}
})
