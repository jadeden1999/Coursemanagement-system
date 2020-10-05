module.exports = function admin(req, res, next) {
  if (!req.user.isadmin) return res.status("403").send("access denied");

  next();
};
