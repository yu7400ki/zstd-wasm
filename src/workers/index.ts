import { compressFactory, decompressFactory } from "../lib";
import Zstd from "../zstd.js";
import WASM from "../zstd.wasm";

const zstd = Zstd({
  instantiateWasm: async (
    imports: WebAssembly.Imports,
    receiver: (
      instance: WebAssembly.WebAssemblyInstantiatedSource
    ) => Promise<unknown>,
  ) => {
    receiver(await WebAssembly.instantiate(WASM, imports));
  },
});

export const compress: (
  input: Uint8Array,
  level?: number
) => Promise<Uint8Array> = compressFactory(zstd);

export const decompress: (input: Uint8Array) => Promise<Uint8Array> =
  decompressFactory(zstd);
