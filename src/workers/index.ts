import { compressFactory, decompressFactory } from "../lib";
import Zstd from "../zstd.js";
import WASM from "../zstd.wasm";

const zstd = Zstd({
  instantiateWasm: async (
    imports: WebAssembly.Imports,
    receiver: (
      instance: WebAssembly.WebAssemblyInstantiatedSource,
    ) => Promise<unknown>,
  ) => {
    receiver(await WebAssembly.instantiate(WASM, imports));
  },
});

/**
 * Compresses the input data using Zstandard.
 * @param {Uint8Array} input The input data to compress.
 * @param {number} [level=3] The compression level to use.
 * @returns {Promise<Uint8Array>} The compressed data.
 * @example
 * const input = new Uint8Array([1, 2, 3, 4, 5]);
 * const compressed = await compress(input);
 */
export const compress: (
  input: Uint8Array,
  level?: number,
) => Promise<Uint8Array> = compressFactory(zstd);

/**
 * Decompresses the input data using Zstandard.
 * @param {Uint8Array} input The input data to decompress.
 * @returns {Promise<Uint8Array>} The decompressed data.
 * @example
 * const input = new Uint8Array([1, 2, 3, 4, 5]);
 * const decompressed = await decompress(input);
 */
export const decompress: (input: Uint8Array) => Promise<Uint8Array> =
  decompressFactory(zstd);
