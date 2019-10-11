const Theme = require('../models/Theme');

module.exports = {
  async store(req, res) {
    const { name, course } = req.body;

    try {
      const theme = await Theme.create({
        name,
        course
      });

      return res.json(theme);
    } catch (e) {
      return res.status(500).send('' + e);
    }
  },

  async getThemes(req, res) {
    try {
      const theme = await Theme.find();

      return res.json(theme);
    } catch (e) {
      return res.status(500).send('' + e);
    }
  }
};
