const AppError = require('../errors/appError');
const { BAD_REQUEST } = require('../errors/httpStatusCode');
const { getAdminUserById } = require('../managers/managerAdminUser');
const decodedToken = require('../utils/decodeJWT');
const { tryCatch } = require('../utils/tryCatch');

const adminAuthorization = tryCatch(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];

    const decode = decodedToken(token);

    req.adminUser = await getAdminUserById(decode.id);

    if (!req.adminUser || req.adminUser.role !== 'ROOT') {
      throw new AppError(BAD_REQUEST, "You don't have permissions");
    }

    return next();
  }
  throw new AppError(BAD_REQUEST, 'token not sent');
});

module.exports = adminAuthorization;
