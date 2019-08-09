const axios = require('axios');
const Dev = require('../models/DevModel');

module.exports = {
  async save(req, res) {

    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) return res.json(userExists);

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { avatar_url: avatar, bio, name } = response.data;

    const dev = await Dev.create({
      name, 
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  },

  async index(req, res) {
    
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        {_id: { $ne: user }},
        {_id: { $nin: loggedDev.likes }},
        {_id: { $nin: loggedDev.dislikes }}
      ]
    });

    return res.json(users);
  }
} 