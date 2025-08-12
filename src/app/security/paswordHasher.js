// src/security/password-hasher.js

const bcrypt = require('bcryptjs');

class PasswordHasher {
    // a private variable
  #bcrypt;

  constructor() {
    this.#bcrypt = bcrypt; 
  }

  async hash(password) {
    return await this.#bcrypt.hash(password, 10);  
  }

  async compare(plainPassword, hashedPassword) {
    return await this.#bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new PasswordHasher();
