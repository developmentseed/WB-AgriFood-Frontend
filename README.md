# World Bank Agrifood

Front-end application for the Agrifood project by the World Bank.

## Install Project Dependencies

To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) (see [.nvmrc](./.nvmrc) for version) (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [pnpm](https://pnpm.io/installation) package manager

## Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:

```sh
nvm install
```

Install Node modules:

```sh
pnpm install
```

## Configuration

This app uses Vite.js as build tool, which uses `.env*` files to configure the app. Please refer to "[Env Variables](https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)" documentation page of Vite.js for more details.

The default configuration is available in the [.env](.env) file. To use a custom setup in development, create a `.env.development.local` file which will override the default values. This file is ignored by git.

## Starting the app

```sh
pnpm dev
```

Compiles the javascript and launches the server making the site available at `http://localhost:9000/`.

The system will watch files and execute tasks whenever one of them changes. The site will automatically refresh since it is bundled with livereload.

## Deployment

Preview the production with:

```sh
pnpm preview
```

To prepare the app for deployment run:

```sh
pnpm build
```

This will package the app and place all the contents in the `dist` directory.
The app can then be run by any web server.

## License

[MIT](LICENSE)
