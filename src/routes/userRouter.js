const router = require('express').Router();
const bcrypt = require('bcrypt');
const { escapeForRegExp } = require('session-file-store/lib/session-file-helpers');
// const async = require('hbs/lib/async');
const { User } = require('../../db/models');

router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;
  if (name && password && email) {
    const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
    console.log('kavabanga');
    try {
      const newUser = await User.create({ ...req.body, password: secretPass });
      req.session.user = { id: newUser.id, name: newUser.name };
      return res.json(newUser);
    } catch (err) {
      // console.log(err);
      return res.status(401).json({ status: false, message: 'Ошибка авторизации' });
    }
  }
  return res.sendStatus(500);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  // const error = { name: 'Ошибка ввода данных : email или Пароль неверный!' };
  if (email && password) {
    const currentUser = await User.findOne({ where: { email } });
    if (currentUser && await bcrypt.compare(password, currentUser.password)) {
      req.session.user = { id: currentUser.id, name: currentUser.name };
      // return res.send('OK');
      return res.json({ id: currentUser.id, name: currentUser.name });
    }

    return res.sendStatus(401);
  }
  return res.send(500);
});

router.get('/profile/:id', async (req, res) => {
  const result = await User.findOne({ where: { id: req.params.id } });
  res.json(result);
  console.log(result);
})
  .put('/profile/:id', async (req, res) => {
    const {
      name, password, email, avatar, description,
    } = req.body;
    console.log(name, email);
    if (name && password && email && avatar && description) {
      const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
      try {
        const newUser = await User.update(
          { ...req.body, password: secretPass },
          { where: { id: req.params.id } },
        );
        console.log(newUser);
        req.session.user = { id: newUser.id, name: newUser.name };
        return res.send('OK');
      } catch (err) {
        return res.send('Ошибка');
      }
    }
    return res.send('OK');
  });

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
router.get('/find/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  res.json(user);
});

router.get('/logout', (req, res) => {
  console.log('=========================================', req);
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});
module.exports = router;
