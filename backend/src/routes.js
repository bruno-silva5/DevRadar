// Getting the express routing module
const { Router } = require('express');
const routes = Router();

routes.put('/users/:id', (req, res) => {
  console.log(req.body);
  return res.json({ message: 'Hellooo Omnistack' });
});

module.exports = routes;