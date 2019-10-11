const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const { title, theme, description, emailUser, comments, photo } = req.body;

    try {
      const post = await Post.create({
        title,
        theme,
        description,
        emailUser,
        comments,
        photo
      });

      return res.json(post);
    } catch (e) {
      return res.status(500).send('' + e);
    }
  }
};
