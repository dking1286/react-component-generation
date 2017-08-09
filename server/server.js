import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../src/components';

console.log(ReactDOMServer.renderToString(<App />));
