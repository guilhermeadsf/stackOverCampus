const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  async store(req, res) {
    const {
      name,
      password,
      email,
      course,
      sex,
      birthday,
      interests
    } = req.body;

    const salt = bcrypt.genSaltSync();
    const encryptPassword = bcrypt.hashSync(password, salt);

    try {
      const user = await User.create({
        name,
        password: encryptPassword,
        email,
        course,
        sex,
        birthday,
        interests
      });

      return res.json(user);
    } catch (e) {
      return res.status(500).send('' + e);
    }
  }

  //   async getThemes(req, res) {
  //     try {
  //       const theme = await Theme.find();

  //       return res.json(theme);
  //     } catch (e) {
  //       return res.status(500).send('' + e);
  //     }
  //   }
};
