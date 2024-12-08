# @yu7400ki/zstd-wasm

[![JSR Scope](https://jsr.io/badges/@yu7400ki)](https://jsr.io/@<scope>)
[![JSR](https://jsr.io/badges/@yu7400ki/zstd-wasm)](https://jsr.io/@<scope>/<package>)
[![JSR Score](https://jsr.io/badges/@yu7400ki/zstd-wasm/score)](https://jsr.io/@<scope>/<package>)

`@yu7400ki/zstd-wasm` is a WebAssembly build of [zstd](https://github.com/facebook/zstd) using [Emscripten](https://github.com/emscripten-core/emscripten).

## Installation

```sh
npx jsr add @yu7400ki/zstd-wasm
```

or

```sh
deno add jsr:@yu7400ki/zstd-wasm
```

## Usage

### ESM

```ts
import { compress, decompress } from "@yu7400ki/zstd-wasm";

const data = new Uint8Array([1, 2, 3, 4, 5]);
const compressed = await compress(data);
const decompressed = await decompress(compressed);
console.log(decompressed); // Uint8Array [ 1, 2, 3, 4, 5 ]
```

### Cloudflare Workers

```ts
import { compress, decompress } from "@yu7400ki/zstd-wasm/workers";

const data = new Uint8Array([1, 2, 3, 4, 5]);
const compressed = await compress(data);
const decompressed = await decompress(compressed);
console.log(decompressed); // Uint8Array [ 1, 2, 3, 4, 5 ]
```

## Local Development

### Requirements

- [Bun](https://bun.sh)
- [Docker](https://www.docker.com)

### Build

```sh
bun install
bun run build:wasm
```

## License

MIT

