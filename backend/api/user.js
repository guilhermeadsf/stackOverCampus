const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const save = (req, res) => {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(req.body.senha, salt);

    const obj = {
      nome: req.body.nome,
      email: req.body.email,
      senha: password,
      curso_id: req.body.curso_id,
      account_type_id: req.body.account_type_id
    };

    app
      .db('users')
      .insert(obj)
      .then(_ => res.status(204).send())
      .catch(err => res.status(400).json(err));
  };

  return { save };
};
