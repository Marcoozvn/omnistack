const express = require("express")

const DevController = require('./controllers/DevController')
const LikesController = require('./controllers/LikeController')
const DislikesController = require('./controllers/DislikeController')

const routes = express.Router()

routes.get('/', (req, res) => {
  return res.send("Hello World")
})
routes.get('/dev', DevController.index)
routes.post('/dev', DevController.save)
routes.post('/dev/:devId/likes', LikesController.save)
routes.post('/dev/:devId/dislikes', DislikesController.save)


module.exports = routes