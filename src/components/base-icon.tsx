import { component$, Slot } from '@qwik.dev/core'

import { BaseIconProps } from '../icon-props'
import { fallbackProps } from '../default-props'

export default component$((props: BaseIconProps) => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			width={props.size ?? fallbackProps.size}
			height={props.size ?? fallbackProps.size}
			stroke={props.stroke ?? props.color ?? fallbackProps.stroke}
			color={undefined}
			stroke-width={
				props['stroke-width'] ?? fallbackProps['stroke-width']
			}
			stroke-linecap={
				props['stroke-linecap'] ?? fallbackProps['stroke-linecap']
			}
			stroke-linejoin={
				props['stroke-linejoin'] ?? fallbackProps['stroke-linejoin']
			}
			class={`lucide lucide-${props.name} ${props.class ?? ''}`}
		>
			<Slot />
		</svg>
	)
})
