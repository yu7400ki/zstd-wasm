#include <emscripten.h>
#include <emscripten/bind.h>
#include <vector>
#include <stdexcept>
#include "zstd.h"

using namespace emscripten;

emscripten::val copy_to_js_array(const std::vector<uint8_t>& vec) {
    auto result = emscripten::val::global("Uint8Array").new_(vec.size());
    emscripten::val view{emscripten::typed_memory_view(vec.size(), vec.data())};
    result.call<void>("set", view);
    return result;
}

emscripten::val compress(const int ptr, const int length, int compressionLevel) {
    auto pointer = reinterpret_cast<uint8_t *>(ptr);
    size_t compressedSize = ZSTD_compressBound(length);
    std::vector<uint8_t> compressedData(compressedSize);

    size_t actualCompressedSize = ZSTD_compress(
        compressedData.data(), compressedData.size(),
        pointer, length,
        compressionLevel
    );

    if (ZSTD_isError(actualCompressedSize)) {
        throw std::runtime_error("Compression failed: " + std::string(ZSTD_getErrorName(actualCompressedSize)));
    }

    compressedData.resize(actualCompressedSize);
    return copy_to_js_array(compressedData);
}

emscripten::val decompress(const int ptr, const int length) {
    auto pointer = reinterpret_cast<uint8_t *>(ptr);
    unsigned long long decompressedSize = ZSTD_getFrameContentSize(pointer, length);
    if (decompressedSize == ZSTD_CONTENTSIZE_ERROR || decompressedSize == ZSTD_CONTENTSIZE_UNKNOWN) {
        throw std::runtime_error("Unable to determine decompressed size");
    }

    std::vector<uint8_t> decompressedData(decompressedSize);

    size_t actualDecompressedSize = ZSTD_decompress(
        decompressedData.data(), decompressedData.size(),
        pointer, length
    );

    if (ZSTD_isError(actualDecompressedSize)) {
        throw std::runtime_error("Decompression failed: " + std::string(ZSTD_getErrorName(actualDecompressedSize)));
    }

    return copy_to_js_array(decompressedData);
}

EMSCRIPTEN_BINDINGS(zstd_module) {
    function("compress", &compress);
    function("decompress", &decompress);
}
