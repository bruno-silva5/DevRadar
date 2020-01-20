const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    // Search for devs in 10km of distance tops
    // Filter for techs

    
    try {
      const { latitude, longitude, techs } = req.query;
  
      const techsArray = parseStringAsArray(techs);
      const devs = await Dev.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000
          }
        }
      });
  
      return res.json({ devs: devs });
      
    } catch (error) {
      return res.json({ error: `Invalid or null parameters inserted` });
    }

    
  }
}