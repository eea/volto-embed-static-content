# @eeacms/volto-embed-static-content

[![Releases](https://img.shields.io/github/v/release/eea/volto-embed-static-content)](https://github.com/eea/volto-embed-static-content/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-embed-static-content%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-embed-static-content/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content)

[Volto](https://github.com/plone/volto) add-on

## Upgrade

### Upgrading to 2.x

> This version requires `Volto 18` or `Volto 19` and Node.js 22.

The block id, the schema fields and the package entry point are unchanged. The release adds Volto 19 support and moves the published package to `packages/volto-embed-static-content`.

#### Changes you can see

- **Figures render through Volto's `Image`** instead of Semantic UI's, so the `<img>` no longer carries the `ui image` class and is marked `fetchpriority="high"`. Site rules that target `.ui.image` no longer apply to embedded figures.
- **The download button** dispatches its synthetic click without `view: window`.

#### Breaking changes

- **Node.js 22 or newer is required** (`engines.node >= 22`).
- **React 18 is required.** The package declares `react` and `react-dom` as `^18.2.0` peers.

## Features

https://github.com/eea/volto-embed-static-content/assets/50819975/dfafd551-f8d4-4517-aed5-46be3fb9c8da

This add-on can incorporate pages with preview_images set, primarily utilized for static visualizations within EEA.

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-embed-static-content": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-embed-static-content'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
