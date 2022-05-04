const router = require('express').Router();
const { Product } = require('../../db/models');

// router.get('/', async (req, res) => {
//   const products = await Products.findAll();
//   res.json(products);
// });
router.get('/:id', async (req, res) => {
  const product = await Product.findAll({ where: { userId: req.params.id } });
  res.json(product);
});

module.exports = router;
