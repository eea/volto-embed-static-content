# volto-embed-static-content

[![Releases](https://img.shields.io/github/v/release/eea/volto-embed-static-content)](https://github.com/eea/volto-embed-static-content/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-embed-static-content%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-embed-static-content/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-embed-static-content%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-embed-static-content/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content&branch=develop)


[Volto](https://github.com/plone/volto) add-on

## Features


https://github.com/eea/volto-embed-static-content/assets/50819975/dfafd551-f8d4-4517-aed5-46be3fb9c8da

This add-on can incorporate pages with preview_images set, primarily utilized for static visualizations within EEA.


## Getting started

### Try volto-embed-static-content with Docker

      git clone https://github.com/eea/volto-embed-static-content.git
      cd volto-embed-static-content
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-embed-static-content to your Volto project

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

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-embed-static-content/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-embed-static-content/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-embed-static-content/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
