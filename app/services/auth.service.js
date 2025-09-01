const { User } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const GenericService = require('../services/generic.service');
const { TokenProvider, PaswordHasher} = require('../shared/security');


class AuthService extends GenericService {
  constructor() {
    super(User); 
  }

  async register(data) {
    const {email,password,username,role}=data
    const isEmailDuplicate = await this.model.isEmailTaken(email);
    if (isEmailDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already Exist');
    }
    const isDuplicate = await this.model.isTitleTaken(username);
    if (isDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Username already taken');
    }
    const hashedPassword =await PaswordHasher.hash(password);
    
    const userData = {
        email,
        username,
        role,
        password: hashedPassword,
        timeZone: data.timeZone || 'America/New_York',
      
    };
    const user = await this.create(userData)
  
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    timeZone: user.timeZone
  };
  }

 async authenticateUser(body) {
  const { email, password } = body;
  const user = await this.findOne({ email });
  if (!user) {
    throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
  }  const isMatch = await PaswordHasher.compare(password, user.password); 
  if (!isMatch) {
    throw new ApiError(HttpStatus.FORBIDDEN, 'Invalid credentials');
  }
  
  const payload = { id: user.id, role: user.role };
  const accessToken = TokenProvider.generateAccessToken(payload);
  const refreshToken = TokenProvider.generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      timeZone: user.timeZone, 
    },
  };
}
  async update(id, data) {
    const { email, password, username} = data;

    const isUsernameDuplicate = await this.model.isTitleTaken(username, id);
    if (isUsernameDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Username already taken');
    }
    const isEmailDuplicate = await this.model.isEmailTaken(email, id);
    if (isEmailDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email already taken');
    }

    const updatedData = { ...data };

    if (password) {
      const hashedPassword = await PaswordHasher.hash(password);
      updatedData.password = hashedPassword;
    }

    const user = await this.model.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      timeZone: user.timeZone,
      address:user?.address,
      contactNumber:user?.contactNumber
    };
  }
  // Get user profile
  async getProfile(userId) {
    const user = await this.model.findById(userId).populate('role', 'name type').select('-password');
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }
   return user
  }
  async getAll(queryParams, options) {
    const { search, ...finalFilter } = queryParams;

    let filter = { ...finalFilter };
    const searchFilter = await this.model.search({ search });
    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { $and: [finalFilter, searchFilter] };
    }
    const populate = [
      { path: 'role', select: '_id name' },

    ];
    return this.model.paginate(filter, {
      ...options,
      populate,
      select: '-password',
    });
  }
  // Generate access and refresh tokens using TokenProvider
  generateTokens(payload) {
    const accessToken = TokenProvider.generateAccessToken(payload);
    const refreshToken = TokenProvider.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}

module.exports = new AuthService();
