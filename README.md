# WakkanayBrowserWallet

This browser wallet is an example implementation of a Plapp (Plasma application) developed with Plasma Chamber and React.
Official Testnet release is planned in the first week of March 2020, and it will be run on Kovan Testnet.

## Running Wakkanay Browser Wallet locally

```
1. run ganache-cli & deploy ovm-contract & run aggregator
  $ git clone https://github.com/cryptoeconomicslab/wakkanay.git
  $ cd wakkanay
  $ npm run docker:build
  $ npm run docker:start

2. run WakkanayBrowserWallet
  $ git clone git@github.com:cryptoeconomicslab/WakkanayBrowserWallet.git
  $ cp .sample.env .env
  $ npm i
  $ npm run dev

3. paste TEST_PRIVATE_KEY into input field from .env
```

## Community

If you have any question regarding this wallet implementation or Plapps development with Plasma Chamber in general, feel free to ask us directly in our R&D community channel: https://t.me/cryptoeocnomicslab
