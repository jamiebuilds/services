'use strict';

const express = require('express');
const child = require('child_process');
const path = require('path');
const pify = require('pify');
const next = require('next');
const fs = pify(require('fs'));

const servicesDir = path.join(__dirname, 'services');

async function main() {
  const app = express();
  const api = express.Router();

  app.use('/api', api);

  const servicesDirs = await fs.readdir(servicesDir);

  await Promise.all(servicesDirs.map(async (service) => {
    const serviceDir = path.join(servicesDir, service);

    const serverFile = path.join(serviceDir, 'server.js');
    const pagesDir = path.join(serviceDir, 'pages');

    const serverStat = await fs.stat(serverFile);
    const pagesStat  = await fs.stat(pagesDir);

    if (serverStat.isFile()) {
      require(serverFile)(api);
    }

    if (pagesStat.isDirectory()) {
      const pages = next({ dir: serviceDir, dev: true });
      const handle = pages.getRequestHandler();

      await pages.prepare();

      app.get(`/${service}*`, (req, res) => {
        const url = req.url.replace(`/${service}`, '');
        const reqCopy = Object.assign({}, req, { url });
        handle(reqCopy, res);
      });
    }
  }));

  app.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}

main();
