const axios = require('axios'); // axios make calls to others avaialble APIs
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index (show all), show (show one), update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    
    return res.json(devs);
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
      console.log(techsArray);

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
    }

    return res.json(dev);

  }
}