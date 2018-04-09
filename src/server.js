import path from 'path';
import Server from 'express-emitter';
import express from 'express';

const PORT = process.env.PORT || 2018;

const expressApp = app => app
  .set('port', PORT)
  .get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')))
  .use('/assets', express.static(path.resolve(__dirname, '../public')))
  .use('/vendors', express.static(path.resolve(__dirname, '../node_modules')))
  ;

const server = new Server(expressApp);

server.on('listening', () => console.log(`Server started on port ${PORT}`));
server.on('error', error => console.log(error.stack));
