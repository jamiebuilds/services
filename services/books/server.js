'use strict';

const books = require('./fixture.json');

module.exports = function(router) {
  router.get('/books', (req, res) => {
    res.json({ books });
  });
};
