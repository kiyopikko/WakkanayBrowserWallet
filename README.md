# gazelle wallet

This browser wallet is an example implementation of a Plapp (Plasma application) developed with [gazelle](https://gzle.io/) and React.
Official Testnet release is planned in Q2 2020, and it will be run on Kovan Testnet.

## Running gazelle wallet locally

```
1. run ganache-cli & deploy ovm-contract & run aggregator
  $ git clone -b alpha-v1.0.0 https://github.com/cryptoeconomicslab/gazelle.git
  $ cd gazelle
  $ npm run docker:build
  $ npm run docker:cp
  $ npm run docker:start

2. run gazelle wallet
  $ git clone https://github.com/cryptoeconomicslab/gazelle-wallet.git
  $ cp .sample.env .env
  $ npm i
  $ npm run dev

3. paste TEST_PRIVATE_KEY into input field from .env
```

## Community

If you have any question regarding this wallet implementation or Plapps development with [gazelle](https://gzle.io/) in general, feel free to ask us directly in our R&D community channel: https://t.me/cryptoeocnomicslab
