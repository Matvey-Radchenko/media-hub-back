const router = require('express').Router();
const { Friends } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const friend = await Friends.findAll({ where: { userId: req.params.id } });
  res.json(friend);
});

module.exports = router;
