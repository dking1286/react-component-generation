# React Component Generation Demo

## Prerequisites
* yarn version 0.27.5
* Nodejs version 6.9.1

## Getting started
Clone this repository, then install dependencies:
```bash
yarn
```

## Building
To run the webpack build,
```bash
yarn run build:watch
```

This will build the project, place the output files in the `public` directory, and rebuild the project any time a change is made.

## Running the client application
With the webpack build running, open the file `public/index.html`
in your web browser.

## React Component Generation
To create a new Rreact component,
```bash
yarn run generate-component <ComponentName>
```

For example,
```bash
yarn run generate-component Footer
```

This will create a new folder `components/Footer`, add the javascript file `Footer.js` to the new folder, and add `import` and `export` statements for the new component into `components/index.js`.

By default, a stateless functional component is created. In order to create a stateful component,
```bash
yarn run generate-class-component <ComponentName>
```

For example,
```bash
yarn run generate-class-component AppContainer
```

## A note on circular dependencies
Looking at the `src/components` directory, it might seem at first glance that
there will be circular dependency issues when building and executing the
code. For example, `src/components/index.js` and `src/components/App/App.js`
import each other. Fortunately, this does _not_ cause a problem in the webpack
build.

If you were trying to do something isomorphic, like server-side rendering
these components, it would be natural to wonder if a circular dependency issue
would crop up there, since node's module system is somewhat different from
webpack's. Thankfully, it also works on the server side, as can be seen by
running the mock "server application":
```bash
node server/server.js
```