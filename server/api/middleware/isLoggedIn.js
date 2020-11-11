module.exports = function isLoggedIn(req, res, next) {
  if (req.user) {
    console.log(req.user, "there's a user")
    next()
  } else {
    res.sendStatus(401, 'Unauthorized')
  }
}
