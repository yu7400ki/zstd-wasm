import type { MainModule, default as MainModuleFactory } from "./zstd";

const mallocUint8Array = (wasm: MainModule, input: Uint8Array) => {
  const pointer = wasm._malloc(Uint8Array.BYTES_PER_ELEMENT * input.length);
  if (!pointer) {
    throw new Error("Failed to allocate memory");
  }
  wasm.HEAPU8.set(input, pointer / Uint8Array.BYTES_PER_ELEMENT);
  return {
    value: pointer,
    [Symbol.dispose]() {
      wasm._free(pointer);
    },
  };
};

export const compressFactory =
  (module: ReturnType<typeof MainModuleFactory>) =>
  async (input: Uint8Array, level = 3) =>
    module.then((wasm) => {
      using pointer = mallocUint8Array(wasm, input);
      const compressed: Uint8Array = wasm.compress(
        pointer.value,
        input.length,
        level,
      );
      return compressed;
    });

export const decompressFactory =
  (module: ReturnType<typeof MainModuleFactory>) => async (input: Uint8Array) =>
    module.then((wasm) => {
      using pointer = mallocUint8Array(wasm, input);
      const decompressed: Uint8Array = wasm.decompress(
        pointer.value,
        input.length,
      );
      return decompressed;
    });
