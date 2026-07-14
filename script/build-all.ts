// @ts-check
/// <reference lib="esnext" />

import { spawn } from 'node:child_process'
import { join, resolve } from 'node:path'
// @ts-ignore
import { buildIcons } from './build-icons.ts'
import { readdir, rm, writeFile, rename } from 'node:fs/promises'

const root = resolve(join(import.meta.dirname, '..'))

async function cmd(bin: string, args: string[]) {
	const proc = spawn(bin, args, { stdio: 'inherit', cwd: root })
	return new Promise<void>((resolve, reject) => {
		proc.on('exit', (code) => {
			if (code === 0) {
				resolve()
			} else {
				reject(new Error(`Command failed with exit code ${code}`))
			}
		})
	})
}

// Clean build.
try {
	await rm(join(root, 'tsconfig.tsbuildinfo'))
} catch {}
try {
	await rm(join(root, 'lib'), { recursive: true })
} catch {}
try {
	await rm(join(root, 'lib-types'), { recursive: true })
} catch {}

console.log('Generating icon components...')
await buildIcons()

console.log('Generating types...')
await cmd('tsc', ['--emitDeclarationOnly'])

console.log('Building library...')
await cmd('npx', ['vite', 'build', '--mode', 'lib'])

console.log('Building with Qwik...')
await cmd('npx', ['qwik', 'build'])

// Wipe dummy modules used to make Vite produce icon modules.
await writeFile(join(root, 'lib', 'index.js'), 'export default {}')
await writeFile(join(root, 'lib-types', 'index.d.ts'), 'export default {}')

// Rename type definitions.
const typedefs = await readdir(join(root, 'lib-types'))
for (const typedef of typedefs) {
	const path = join(root, 'lib-types', typedef)
	await rename(path, path.replace('.d.ts', '.qwik.d.ts'))
}
