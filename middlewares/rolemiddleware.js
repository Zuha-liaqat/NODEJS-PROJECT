module.exports = function(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        success: false,
        message: "Access denied. You don't have permission"
      });
    }
    next();
  };
};
