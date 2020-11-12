module.exports = async function isAdminUser(req, res, next) {
  if (req.user === 'undefined') res.redirect('back')
  if (!req.user.isAdmin) {
    res.status(401).redirect('back')
  }
  next()
}
