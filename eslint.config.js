// @ts-check

import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
// @ts-expect-error This exports qwikEslint9Plugin but doesn't have definitions for some reason.
import { qwikEslint9Plugin } from 'eslint-plugin-qwik'
import tseslint from 'typescript-eslint'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			qwikEslint9Plugin.configs.recommended,
		],
		plugins: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			qwikEslint9Plugin,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
])
