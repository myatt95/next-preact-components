const express = require('express');
const interceptor = require('express-interceptor');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

require('./next-preact/alias')();

// const {createServer} = require('http');
const { parse } = require('url');
const next = require('next');
const app = next({dev});

const handle = app.getRequestHandler();



const componentHtmlSanitiser = interceptor((req, res) => {
   return {
       isInterceptable: () =>/text\/html/.test(res.get('Content-Type')),
       intercept: (body, send) => {
           body = body.replace('<!DOCTYPE html>', '');
           send(body);
       }
   }
});


app.prepare().then(() => {

    const server = express();

    server.use(componentHtmlSanitiser);

    server.get('*', (req, res) => {
        handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
