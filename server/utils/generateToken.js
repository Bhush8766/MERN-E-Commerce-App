const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 * @param {string} userId
 * @returns {string}
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

/**
 * Generate Refresh Token
 * @param {string} userId
 * @returns {string}
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "30d",
    }
  );
};

/**
 * Send JWT Token in Cookie & Response
 * @param {Object} user
 * @param {number} statusCode
 * @param {Object} res
 */
const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.COOKIE_EXPIRE || 7) *
          24 *
          60 *
          60 *
          1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: new Date(
        Date.now() +
          (parseInt(process.env.REFRESH_COOKIE_EXPIRE || 30) *
            24 *
            60 *
            60 *
            1000)
      ),
    })
    .json({
      success: true,
      token,
      refreshToken,
      user,
    });
};

module.exports = {
  generateToken,
  generateRefreshToken,
  sendToken,
};