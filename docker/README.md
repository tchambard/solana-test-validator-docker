
## build docker images

```sh
# solana base image with anchor, nodejs, yarn...
docker build . -t tchambard/solana-test-validator:solana_1.18.12-anchor_0.30.0 -t tchambard/solana-test-validator:latest
```

## run solana-test-validator

```sh
docker run -ti --name solana-test-validator -v ~/dev:/working-dir:rw --rm tchambard/solana-test-validator:latest bash
```

## run anchor test:

```sh
docker exec -w /working-dir/subpath-to-anchor-project -ti solana-test-validator sh -c "anchor test --skip-local-validator"
```
