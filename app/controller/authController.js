const { createNewUser, authenticateUser} = require('../services/authService'); // Import service layer
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
    const { accessToken, refreshToken } = await authenticateUser(email, password);
    return res.status(200).json({ message: 'Login successful', accessToken, refreshToken });

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(400).json({ error: error.message });
  }
};

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


const externalLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: 'Token not provided' });

  try {
    // Optional: check if token is expired using jwt.decode
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) throw new Error("Invalid token");

    const exp = decoded.payload.exp;
    if (Date.now() >= exp * 1000) {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Now verify by calling external endpoint
    const response = await axios.get(`${process.env.NEMT_URL}/me`, {
      headers: { Authorization: `JWT ${token}` }
    });
     console.log("Respo",response?.data)
    const user = response.data?.user;
    if (!user) throw new Error("User not found");

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return res.json({
      user,
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error('Token validation error:', error.message);
    return res.status(401).json({ error: 'Unauthorized or expired token' });
  }
};

module.exports = {
  externalLogin,
  register,
  login,
  me,
  refreshAccessToken,

};
