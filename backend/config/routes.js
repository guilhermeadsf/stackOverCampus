module.exports = app => {
  app.post('/signup', app.api.user.save);

  app.get('/themes', app.api.themes.getThemes);

  app
    .route('/themesSpecificCourse/:idCourse')
    .get(app.api.themes.getThemesSpecificCourse);
};
