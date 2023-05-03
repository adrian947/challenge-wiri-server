const jwt = require('jsonwebtoken');

const signToken = (id, role) => {
  const token = jwt.sign(
    {
      id,
      role,
    },
    process.env.JSON_WEB_TOKEN_KEY,
    { expiresIn: '7d' }
  );
  return token;
};

module.exports = signToken;
