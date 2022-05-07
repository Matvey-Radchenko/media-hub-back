const router = require('express').Router();
const { Op } = require('sequelize');
const { Friends, User } = require('../../db/models');

// router.get('/:id', async (req, res) => {
// const friend = await Friends.findAll({ where: { userId: req.params.id } });
//   const user = await User.findOne({
//     where: {
//       userId: req.params.id,
//     },
//     attributes: [
//       'id',
//       'name',
//       'email',
//     ],
//     include: [
//       {
//         model: Friends,
//         as: 'friends',
//         attributes: ['id', 'name', 'email'],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   });
// });

// router.get('/:id', async (req, res) => {
//   // const friend = await Friends.findAll({ where: { userId: req.params.id } });
//   try {
//     const friends = await User.findAll({ include: [{ model: Friends, attributes: ['userId'], where: { userId: req.params.id } }, { model: User, attribures: ['name', 'avatar', 'status'] }] });
//     res.json(friends);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get('/:id', async (req, res) => {
//   const currentUser = await User.findOne({ where: { id: req.params.id } });
//   const tmp = [];
//   currentUser.friends.map(async (friendId) => {
//     const one = await User.findOne({ where: { id: friendId.id } });
//     // console.log(one);
//     if (one) {
//       tmp.push(one);
//     }
//   });
//   return res.json(tmp);
// });

router.get('/:id', async (req, res) => {
  // const currentUser = await User.findOne({ where: { id: req.params.id } });
  let friends = await Friends.findAll({ where: { userId: req.params.id }, raw: true });
  // console.log('friends1==========', friends);
  friends = friends.map((el) => ({ id: el.friendId }));
  // console.log('friends1==========', friends);
  // let count = 0;
  const tmp = await User.findAll({
    where: {
      [Op.or]: friends, // если совпадает хотя б с одним элементом, тогда записывает
    },
  });

  // friends.map(async (friend) => {
  //   count++;
  //   const one = await User.findOne({ where: { id: friend.friendId }, raw: true });
  //   console.log('on==========', one);
  //   if (one) {
  //     tmp.push(one);
  //   }
  //   if (count === friends.length) {
  //   }
  // });

  console.log('tmp==========', tmp);
  return res.json(tmp);
});

module.exports = router;
