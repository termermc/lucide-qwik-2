import { mkdir, rm, writeFile } from 'node:fs/promises'
import { createWriteStream, readFileSync } from 'node:fs'

import lucide from 'lucide'

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
	const template = readFileSync('./icon.tsx.template', 'utf8')
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
	return `export { ${name}Icon } from '${iconsRelPath}${name}'\n`
}

async function build() {
	const iconsPath = './src/components/icons/'
	await rm(iconsPath, { recursive: true })
	await mkdir(iconsPath, { recursive: true })

	// build icons
	const build = buildIcon('../../icon-props', '../base-icon')

	await mkdir(iconsPath, { recursive: true })
	await Promise.all(
		Object.entries(icons).map(([name, icon]) => {
			return writeFile(
				`${iconsPath}${name}.tsx`,
				build(icon, name, buildContent(icon)),
				'utf8',
			)
		}),
	)

	// export icons
	const indexFile = createWriteStream('./src/index.ts', 'utf8')
	Object.keys(icons).forEach((k) =>
		indexFile.write(buildExportLine(k, './components/icons/')),
	)
	indexFile.close()
}

await build()
