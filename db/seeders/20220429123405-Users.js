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
        password: '$2b$10$utNwBMfTctBqg70227vtqO9mWNioIqseNMpIdR0zRrxI5liV5GkDa',
        avatar: 'https://www.kino-teatr.ru/movie/kadr/1557/240869.jpg',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aramis',
        email: 'aramis@mail.ru',
        password: '$2b$10$utNwBMfTctBqg70227vtqO9mWNioIqseNMpIdR0zRrxI5liV5GkDa',
        avatar: 'https://i.ibb.co/4MtkVfV/IMG-4473.jpg',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Portos',
        email: 'portos@mail.ru',
        password: '$2b$10$utNwBMfTctBqg70227vtqO9mWNioIqseNMpIdR0zRrxI5liV5GkDa',
        avatar: 'https://citaty.info/files/characters/2504.jpg',
        description: 'Один за все и все за одного',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Atos',
        email: 'atos@mail.ru',
        password: '$2b$10$utNwBMfTctBqg70227vtqO9mWNioIqseNMpIdR0zRrxI5liV5GkDa',
        avatar: 'https://citaty.info/files/characters/2351.jpg',
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
