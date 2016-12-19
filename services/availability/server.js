'use strict';

module.exports = function(router) {
  router.get('/availability', (req, res) => {
    res.send({
      services: [
        { id: '1', name: 'Books', path: '/books/', online: true }
      ]
    })
  });
};
