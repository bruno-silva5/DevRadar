const axios = require('axios'); // axios make calls to others avaialble APIs
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

// index (show all), show (show one), update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    
    return res.json(devs);
  },

  async show(req, res) {
    const dev = await Dev.findOne({
      github_username: req.params.github_username
    });

    return res.json(dev);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev) {
      // await - wait for the response (its necessary to have the async flag)
      const response = await axios.get(`https://api.github.com/users/${github_username}`);

      // Destructuring assignment
      const {name = login, avatar_url, bio} = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filter the connections that are at least 10 Kilometers of distance tops
      // and the new Dev should have at least  1 filtered tech 

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
  
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);

  }
}