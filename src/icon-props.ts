import type { QwikIntrinsicElements, SVGAttributes } from '@qwik.dev/core'

/**
 * Props used for Lucide icon components.
 */
export type IconProps = {
	/**
	 * The size of the icon.
	 * If set, sets `width` and `height` to the same value.
	 */
	size?: SVGAttributes['width']

	/**
	 * @deprecated {@link color} is an SVG property, but it has no effect for icons. Did you mean {@link stroke}?
	 */
	color?: SVGAttributes['color']

	/**
	 * The stroke color of the icon.
	 */
	stroke?: SVGAttributes['stroke']

	/**
	 * The stroke width of the icon.
	 * @default 2
	 */
	'stroke-width'?: SVGAttributes['stroke-width']

	/**
	 * The stroke linecap type of the icon.
	 * @default 'round'
	 */
	'stroke-linecap'?: SVGAttributes['stroke-linecap']

	/**
	 * The stroke linejoin type of the icon.
	 * @default 'round'
	 */
	'stroke-linejoin'?: SVGAttributes['stroke-linejoin']

	/**
	 * Any class names to give the icon element.
	 */
	class?: string
} & QwikIntrinsicElements['svg']

export type BaseIconProps = {
	name: string
} & IconProps
