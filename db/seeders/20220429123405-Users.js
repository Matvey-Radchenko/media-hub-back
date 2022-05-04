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
    const users = [
      {
        name: 'Dartanyan',
        email: 'dartanyan@mail.ru',
        password: 123,
        avatar: '',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aramis',
        email: 'aramis@mail.ru',
        password: 123,
        avatar: '',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Partos',
        email: 'partos@mail.ru',
        password: 123,
        avatar: '',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Atos',
        email: 'atos@mail.ru',
        password: 123,
        avatar: '',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', users, {});
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
