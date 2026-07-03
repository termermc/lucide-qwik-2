import { defineConfig } from 'vite'
import { qwikVite } from '@qwik.dev/core/optimizer'

export default defineConfig(() => {
	return {
		build: {
			target: 'esnext',
			lib: {
				entry: './src/index.ts',
				formats: ['es', 'cjs'],
				fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
			},
		},
		plugins: [qwikVite()],
	}
})
