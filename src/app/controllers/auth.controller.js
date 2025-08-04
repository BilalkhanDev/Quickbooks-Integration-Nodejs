const { default: HttpStatus } = require('http-status');
const { create, authenticateUser} = require('../services/auth.service'); 
const jwt = require('jsonwebtoken');
const axios=require("axios");
const catchAsync = require('../../shared/core/utils/catchAsync');

exports.register =catchAsync(async (req, res) => {
    const user = await create(req.body);
    res.status(HttpStatus.CREATED).json({ message: 'User created successfully', user });
}) 

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
    const { accessToken, refreshToken } = await authenticateUser(email, password);
    return res.status(HttpStatus.CREATED).json({ message: 'Login successful', accessToken, refreshToken });
})

// me 
const me =async(req,res)=>{
    try {
      const { token } = req.body;
  
      const response = await axios.get(
        `${process.env.FLEET_URL}/users/me`,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return res.status(200).json(response.data);
    } catch (error) {
      
      return res.status(500).json({
        error:
          error?.response?.data?.message ||
          error.message ||
          "Error Fecthing User",
      });
    }
}

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }
  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
// Issue a new access token
    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Issue a new refresh token (rotation)
    const newRefreshToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken
    });

  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

module.exports = {
  me,
  refreshAccessToken,

};
