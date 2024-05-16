# volto-embed-static-content

[![Releases](https://img.shields.io/github/v/release/eea/volto-embed-static-content)](https://github.com/eea/volto-embed-static-content/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-embed-static-content%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-embed-static-content/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-embed-static-content%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-embed-static-content/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-embed-static-content-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-embed-static-content-develop)


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

### Add volto-embed-static-content to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-embed-static-content"
   ],

   "dependencies": {
       "@eeacms/volto-embed-static-content": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-embed-static-content
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

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
