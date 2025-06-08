const bcrypt = require("bcryptjs");

const hashUtils = {
  /**
   * Hash a plain text password.
   * @param {string} password - The plain password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  hashPassword: async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  /**
   * Compare plain password with hashed one.
   * @param {string} password - The plain password.
   * @param {string} hashedPassword - The hashed password from DB.
   * @returns {Promise<boolean>} True if match, false otherwise.
   */
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = hashUtils;
