const router = require('express').Router();
const { Tags } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const tags = await Tags.findAll({ where: { userId: req.params.id } });
  res.json(tags);
});

module.exports = router;
