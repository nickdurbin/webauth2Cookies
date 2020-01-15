const Users = require("../../routes/users/user-model")

async function restricted(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    await res.status(401).json({ message: 'you shall not pass!!' });
  }
}

module.exports = {
  restricted
}