const {User} = require('../../db/models')

module.exports = async function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.send("Sorry, pal. You don't have access to this page.")
  }
  next()
}
