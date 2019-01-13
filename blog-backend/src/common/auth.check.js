exports.checkLogin = (ctx, next) => {
  if (!ctx.session.logged) {
    ctx.status = 401; // Unauthorized
    return null;
  }
  return next();
};
