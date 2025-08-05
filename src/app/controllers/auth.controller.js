// controllers/auth.controller.js
const { default: HttpStatus } = require('http-status');
const authService = require('../services/auth.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const axios = require('axios');

exports.register = catchAsync(async (req, res) => {
  const user = await authService.create(req.body);
  res.status(HttpStatus.CREATED).json({ message: 'User created successfully', user });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.authenticateUser(email, password);
  res.status(HttpStatus.CREATED).json({ message: 'Login successful', accessToken, refreshToken, user });
});

exports.refreshAccessToken = catchAsync((req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Refresh token is required' });
  }

  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const tokens = authService.generateTokens({ id: payload.id, role: payload.role });

  res.status(HttpStatus.OK).json(tokens);
});

exports.getProfile = catchAsync(async (req, res) => {
    const userProfile = await authService.getProfile(req.user.id);
    res.status(HttpStatus.OK).json(userProfile);
   
})
