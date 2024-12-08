import { expect, test } from "bun:test";
import { compress, decompress } from "../src";

test("compress", async () => {
  const text = "Hello, World!";
  const input = new TextEncoder().encode(text);
  const compressed = await compress(input);
  const expected = new Uint8Array([
    40, 181, 47, 253, 32, 13, 105, 0, 0, 72, 101, 108, 108, 111, 44, 32, 87,
    111, 114, 108, 100, 33,
  ]);
  expect(compressed).toEqual(expected);
});

test("decompress", async () => {
  const compressed = new Uint8Array([
    40, 181, 47, 253, 32, 13, 105, 0, 0, 72, 101, 108, 108, 111, 44, 32, 87,
    111, 114, 108, 100, 33,
  ]);
  const decompressed = await decompress(compressed);
  const expected = new TextEncoder().encode("Hello, World!");
  expect(decompressed).toEqual(expected);
});

test("compress and decompress", async () => {
  const text = "Hello, World!";
  const input = new TextEncoder().encode(text);
  const compressed = await compress(input);
  const decompressed = await decompress(compressed);
  expect(decompressed).toEqual(input);
});
