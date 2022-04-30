module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const friends = [
      {
        userId: 1,
        friendId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        friendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        friendId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        friendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        friendId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        friendId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Friends', friends, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
