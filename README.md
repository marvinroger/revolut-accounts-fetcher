# Revolut accounts fetcher

[![Test](https://github.com/marvinroger/revolut-accounts-fetcher/workflows/Test/badge.svg)](https://github.com/marvinroger/revolut-accounts-fetcher/actions?query=branch%3Amaster+workflow%3ATest)

This is a very basic Revolut accounts fetcher, that uses the Revolut for Business Open API sandbox. It handles the authentication and returns the list of accounts of the logged in user.

## Usage

1. Put a `./.env` file in the root of the repo (see the `./.env.example` template)
2. Run `npm install && npm start`
3. A Revolut authentication page will open. Log in, and you will be redirected to a page showing the list of your accounts

## Architecture

The code is written in TypeScript and transpiled to JavaScript on `postinstall`.

* `/loaders/`: to avoid setting up express, loading configuration, etc. in the entry file, the concept of "loaders" is used. This way, `index.ts` only has to call `init()`
* `/revolut/`: contains the code related to "core" Revolut: JWT signing, token exchange and API calls
* `/services/`: to avoid having business logic in the express handlers, the business logic is defined in "services"
* `/config`: the `.env` file is loaded here, and the configuration is parsed, validated and normalized
* `/router`: the express router is here
