import { compressFactory, decompressFactory } from "./lib";
import Zstd from "./zstd.js";

const zstd = Zstd();

export const compress: (
  input: Uint8Array,
  level?: number
) => Promise<Uint8Array> = compressFactory(zstd);

export const decompress: (input: Uint8Array) => Promise<Uint8Array> =
  decompressFactory(zstd);
