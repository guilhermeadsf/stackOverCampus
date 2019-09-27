module.exports = app => {
  const getThemes = (req, res) => {
    app
      .db('themes')
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json(err));
  };

  const getThemesSpecificCourse = (req, res) => {
    app
      .db('themes')
      .where({ course_id: req.params.idCourse })
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json(err));
  };

  return { getThemes, getThemesSpecificCourse };
};
