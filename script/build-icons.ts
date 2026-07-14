// @ts-check
/// <reference lib="esnext" />

import { mkdir, rm, writeFile, readFile, readdir } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'

import lucide from 'lucide'
import { join, resolve } from 'node:path'

const rootDir = resolve(join(import.meta.dirname, '..'))
const templateStr = await readFile(join(rootDir, '/icon.tsx.template'), 'utf8')

// Copy the icons object so that it can be modified.
// Modules cannot have keys deleted from them.
const icons = { ...lucide.icons }

// Remove duplicates with the same capitalization.
{
	const entries = Object.entries(icons)
	for (let i = 0; i < entries.length; i++) {
		const name = entries[i][0] as keyof typeof icons
		const val = entries[i][1]

		if (!Array.isArray(val)) {
			delete icons[name]
			entries.splice(i, 1)
			i--
			continue
		}

		const dupeIdx = entries.findLastIndex(
			([dupeName]) => name.toLowerCase() === dupeName.toLowerCase(),
		)
		if (dupeIdx !== -1 && dupeIdx !== i) {
			delete icons[name]
			entries.splice(i, 1)
			i--
		}
	}
}

function buildContent(nodes: lucide.IconNode) {
	const elements = nodes.map(([tag, attrs]) => {
		const attrsStr = Object.entries(attrs)
			.map(([k, v]) => `${k}="${v}"`)
			.join(' ')
		return `\t\t\t<${tag} ${attrsStr}/>`
	})

	return `<>\n${elements.join('\n')}\n\t\t</>`
}

function buildIcon(typesRelPath: string, baseIconRelPath: string) {
	const template = templateStr
		.replaceAll('{{TYPES_REL_PATH}}', typesRelPath)
		.replaceAll('{{BASE_ICON_REL_PATH}}', baseIconRelPath)

	return (icon: lucide.IconNode, name: string, content: string) => {
		const elems = icon.map(([tag, attrs]) => {
			return `<${tag} ${Object.entries(attrs)
				.map(([k, v]) => `${k}="${v}"`)
				.join(' ')}/>`
		})
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" style="background-color: #fff; border-radius: 2px" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${elems.join('')}</svg>`
		const svgUrl = `data:image/svg+xml;base64,${btoa(svg)}`

		return template
			.replaceAll('{{ICON_PREVIEW_URL}}', svgUrl)
			.replaceAll('{{ICON_NAME}}', name)
			.replaceAll('{{CONTENT}}', content)
	}
}

function buildExportLine(name: string, iconsRelPath: string) {
	return `export { ${name}Icon } from '${iconsRelPath}${name}Icon.qwik'\n`
}

export async function buildIcons(): Promise<void> {
	const iconsPath = join(rootDir, './src')
	await mkdir(iconsPath, { recursive: true })
	for (const file of await readdir(iconsPath)) {
		if (file.endsWith('Icon.qwik.tsx')) {
			await rm(join(iconsPath, file))
		}
	}

	// Build icons.
	const build = buildIcon('./icon-props', './base-icon')

	await mkdir(iconsPath, { recursive: true })
	await Promise.all(
		Object.entries(icons).map(([name, icon]) => {
			return writeFile(
				join(iconsPath, `${name}Icon.qwik.tsx`),
				build(icon, name, buildContent(icon)),
				'utf8',
			)
		}),
	)

	// Export icons.
	const indexFile = createWriteStream('./src/index.ts', 'utf8')
	for (const k of Object.keys(icons)) {
		indexFile.write(buildExportLine(k, './'))
	}
	indexFile.close()
}

if (import.meta.main) {
	await buildIcons()
}
