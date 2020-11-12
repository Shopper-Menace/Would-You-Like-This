module.exports = function isLoggedIn(req, res, next) {
  if (!req.user) {
    res.redirect('back')
  } else if (req.user.dataValues.id === req.session.passport.user) {
    next()
  }
}
