const { createNewUser, authenticateUser, checkIfUserIsBlocked} = require('../services/authService'); // Import service layer
const jwt = require('jsonwebtoken');
const axios=require("axios")
// Signup Controller
const register = async (req, res) => {
  try {
    const user = await createNewUser(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signin Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isBlocked = await checkIfUserIsBlocked(email);
    if (isBlocked) {
      return res.status(429).json({ error: 'Too many failed attempts. Try again later.' });
    }

    const { accessToken, refreshToken } = await authenticateUser(email, password);
    return res.status(200).json({ message: 'Login successful', accessToken, refreshToken });

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};
const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is required' });
  }

  console.log("↩️ Received refresh token:", refreshToken);


  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("✅ Token verified for user:", payload?.id);

    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("❌ Token expired or invalid", err);
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

const externalLogin=async(req,res)=>{
   console.log("Req.body",req.body)
   const { token } = req.body;

  try {
    const response = await axios.get(`${process.env.NEMT_URL}/me`, {
      headers: { Authorization: `JWT ${token}` }
    });

    const user = response.data?.user || null;

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({
      user,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Token validation error:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }

}
module.exports = {
  externalLogin,
  register,
  login,
  refreshAccessToken,

};
