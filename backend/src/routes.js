// Getting the express routing module
const { Router } = require('express');
const routes = Router();
const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');

routes.get('/devs/:github_username', DevController.show);
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);

routes.get('/search', SearchController.index);

module.exports = routes;