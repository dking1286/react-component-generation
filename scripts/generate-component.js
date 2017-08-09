/* eslint-disable */
const path = require('path');
const fs = require('fs');
const { curry } = require('ramda');

const main = (argv) => {
  const isClass = isClassComponent(argv);
  const componentName = getComponentName(argv);
  const templatePath = getTemplatePathFromArgv(argv);

  const template = fs.readFileSync(templatePath, 'utf-8');
  const newComponentDirectory = getNewComponentDirectory(componentName);
  const newComponent = renderTemplate(template, componentName);

  const componentIndex = fs.readFileSync(componentIndexPath, 'utf-8');
  const newComponentIndex = updateComponentIndex(componentIndex, componentName);

  fs.mkdirSync(newComponentDirectory);

  fs.writeFileSync(
    path.join(newComponentDirectory, `${componentName}.js`),
    newComponent
  );

  fs.writeFileSync(
    componentIndexPath,
    newComponentIndex
  );
}

const pipeline = (initial, ...fns) => fns.reduce((curr, f) => f(curr), initial);

// Array utilities
const last = (arr) => arr[arr.length - 1]
const filter = curry((f, arr) => arr.filter(f));
const find = curry((f, arr) => arr.find(f));

// String utilities
const prepend = curry((toPrepend, str) => toPrepend.concat(str));
const append = curry((toAppend, str) => str.concat(toAppend))
const replace = curry((pattern, replaceWith, str) => str.replace(pattern, replaceWith));

// Command line argument parsing
const getComponentName = (argv) => pipeline(
  argv,
  filter(arg => arg !== '--class'),
  last
);

const isClassComponent = (argv) => pipeline(
  argv,
  find(arg => arg === '--class'),
  Boolean
);

const getTemplatePathFromArgv = (argv) => (
  isClassComponent(argv)
    ? path.join(__dirname, 'templates/class-component-template.js')
    : path.join(__dirname, 'templates/functional-component-template.js')
);

// Functions for updating the component index.js
const componentIndexPath = path.join(__dirname, '../src/components/index.js')

const updateComponentIndex = (old, componentName) => pipeline(
  old,
  prepend(`import _${componentName} from './${componentName}/${componentName}';\n`),
  append(`export const ${componentName} = _${componentName};\n`)
)

// Functions for generating the new component files
const renderTemplate = (template, componentName) => (
  template.replace(/__ComponentName__/g, componentName)
);

const getNewComponentDirectory = (componentName) => (
  path.join(__dirname, `../src/components/${componentName}`)
);

// Running the main function
main(process.argv);