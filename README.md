# WakkanayBrowserWallet

This browser wallet is an example implementation of a Plapp (Plasma application) developed with Plasma Chamber and React.
Official Testnet release is planned in the first week of March 2020, and it will be run on Kovan Testnet.

## Running Wakkanay Browser Wallet locally

```
1. run ganache-cli
  $ npm i -g ganache-cli (or use npx -g ganache-cli)
  $ ganache-cli --mnemonic 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

2. deploy ovm-contract
  $ git clone git@github.com:cryptoeconomicslab/ovm-contracts.git
  $ npm i
  $ npm run deploy:dev

3. run aggregator
  $ git clone git@github.com:cryptoeconomicslab/wakkanay-plasma-aggregator.git
  $ cp .sample.env .env
  $ npm i
  $ npm run build
  $ npm start

4. run WakkanayBrowserWallet
  $ git clone git@github.com:cryptoeconomicslab/WakkanayBrowserWallet.git
  $ cp .sample.env .env
  $ npm i
  $ npm run dev
```

## Community

If you have any question regarding this wallet implementation or Plapps development with Plasma Chamber in general, feel free to ask us directly in our R&D community channel: https://t.me/cryptoeocnomicslab
