FROM emscripten/emsdk:latest

RUN apt-get update && apt-get install -y \
    git build-essential make \
    && apt-get clean

RUN cd /emsdk/upstream/emscripten && npm ci

WORKDIR /app

RUN git clone https://github.com/facebook/zstd.git --depth 1

RUN cd zstd/lib && emmake make libzstd.a

COPY src/zstd.cpp /app/zstd.cpp

COPY Makefile /app/Makefile

CMD ["make", "build"]
