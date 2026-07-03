<p align="center">
  <a href="https://github.com/lucide-icons/lucide#gh-light-mode-only">
    <img src="https://lucide.dev/lucide-logo-repo.svg#gh-light-mode-only" alt="Lucide - Beautiful & consistent icon toolkit made by the community. Open-source project and a fork of Feather Icons." width="240">
  </a>
  <a href="https://github.com/lucide-icons/lucide#gh-dark-mode-only">
    <img src="https://lucide.dev/lucide-logo-repo-dark.svg#gh-dark-mode-only" alt="Lucide - Beautiful & consistent icon toolkit made by the community. Open-source project and a fork of Feather Icons." width="240">
  </a>
  <a href="https://github.com/qwikDev/qwik">
    <img alt="Qwik Logo" width="240" src="https://raw.githubusercontent.com/QwikDev/qwik/main/packages/docs/public/logos/qwik.svg" />
  </a>
</p>

<p align="center">
  Lucide icon library for Qwik 2 applications.
</p>

<div align="center">

[![npm](https://img.shields.io/npm/v/lucide-qwik-2?color=blue)](https://www.npmjs.com/package/lucide-qwik-2)
![NPM Downloads](https://img.shields.io/npm/dw/lucide-qwik-2)
</div>

<p align="center">
  <a href="https://lucide.dev/guide/">About Lucide</a>
  ·
  <a href="https://lucide.dev/icons/">Lucide Icons</a>
  ·
  <a href="https://lucide.dev/license">License</a>
</p>

# Lucide Qwik 2

An unofficial implementation of the Lucide icon library for Qwik 2 applications.

Until Qwik 2 has a stable release, this library will be tracking beta releases.

Forked from [lucide-qwik](https://github.com/egmaleta/lucide-qwik).

## Installation

```sh
pnpm add lucide-qwik-2
```

```sh
npm install lucide-qwik-2
```

```sh
yarn add lucide-qwik-2
```

```sh
bun add lucide-qwik-2
```

## Documentation

#### Include

Each icon lives in its own module to enable fine-grained tree-shaking.

```tsx
import * as Icons from 'lucide-qwik-2'
import { ThumbsUpIcon } from 'lucide-qwik-2/ThumbsUpIcon'
import { BatteryChargingIcon } from 'lucide-qwik-2/BatteryChargingIcon'

export const App = component$(() => {
	return (
		<div>
			<ThumbsUpIcon size={50} />
			<BatteryChargingIcon stroke="red" />
		</div>
	)
})
```

#### Props

Lucide icons all inherit from the `SVGAttributes` type, meaning they accept all props that normal `<svg>` elemenst do.

Exceptions:

- The custom property `size` controls both `width` and `height`.
- The `color` property is treated as an alias for `stroke`.

## License

Lucide is licensed under the ISC license. See [LICENSE](https://lucide.dev/license).
This library is licensed under [MIT License](https://github.com/LuminescentDev/lucide-icons-qwik/blob/main/LICENSE 'https://github.com/LuminescentDev/lucide-icons-qwik/blob/main/LICENSE').
