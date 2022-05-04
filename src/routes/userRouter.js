const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/signup', async (req, res) => {
  const { name, password, email } = req.body;
  if (name && password && email) {
    const secretPass = await bcrypt.hash(password, Number('10'));
    console.log('kavabanga');
    const newUser = await User.create({ ...req.body, password: secretPass });
    req.session.user = { id: newUser.id, name: newUser.name };
    return res.send('ok');
  }
  return res.send('err');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const error = { name: 'Ошибка ввода данных : email или Пароль неверный!' };
  if (email && password) {
    const currentUser = await User.findOne({ where: { email } });

    if (currentUser && await bcrypt.compare(password, currentUser.password)) {
      req.session.user = { id: currentUser.id, name: currentUser.name };
      return res.send('OK');
    }
  }
  return res.send(error);
});

router.post('/profile', async (req, res) => {
  const {
    name, password, email, avatar, description,
  } = req.body;
  if (name && password && email && avatar && description) {
    const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
    try {
      const newUser = await User.update(
        { ...req.body, password: secretPass },
        { where: { id: req.session.user.id } },
      );
      req.session.user = { id: newUser.id, name: newUser.name };
      return res.send('OK');
    } catch (err) {
      res.send('Ошибка');
    }
  }
  return res.send('OK');
});

// router.get('/logout')((req, res) => {
//   req.session.destroy();
//   res.clearCookie('sid');
//   res.send('OK');
// });

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
router.get('/:id', async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  res.json(user);
});

module.exports = router;
