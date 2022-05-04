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
    const category = [
      {
        name: 'Video',
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: 'Game',
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
    await queryInterface.bulkInsert('Categories', category, {});
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
