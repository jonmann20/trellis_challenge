const express = require('express');
const transformBareModules = require('express-transform-bare-module-specifiers').default;

const server = express();
const ROOT_PATH = process.cwd();

server.use(transformBareModules());
server.use(express.static(`${ROOT_PATH}/`));
server.get('/', (_, res) => res.sendFile(`${ROOT_PATH}/index.html`));

const port = process.env.PORT || 8080;
console.log(`using port ${port}`);
server.listen(port);