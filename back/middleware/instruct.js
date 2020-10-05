module.exports = function instruct(req, res, next) {
  console.log(req.user);
  if (!req.user.ismaster) return res.status("403").send("access denied");

  next();
};
