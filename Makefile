ZSTD_INCLUDE = zstd/lib
ZSTD_LIB = zstd/lib
OUTPUT_DIR = /src

OUTPUT = $(OUTPUT_DIR)/zstd.js
OUTPUT_DTS = $(OUTPUT_DIR)/zstd.d.ts

EMCC_FLAGS = \
	--bind -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 \
	-s EXPORTED_FUNCTIONS="['_free', '_malloc']" -s ALLOW_MEMORY_GROWTH=1 \
	-s ABORTING_MALLOC=0 -s ENVIRONMENT=web -s DYNAMIC_EXECUTION=0 -O3 --emit-tsd $(OUTPUT_DTS)

SOURCE = /src/zstd.cpp

build:
	emcc $(SOURCE) -o $(OUTPUT) -I$(ZSTD_INCLUDE) -L$(ZSTD_LIB) -lzstd \
	$(EMCC_FLAGS)

clean:
	rm -f $(OUTPUT) $(OUTPUT_DTS) $(OUTPUT_DIR)/zstd.wasm
