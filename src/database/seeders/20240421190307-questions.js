'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('questions', [
			{
				body: 'Qual é a sua cor favorita?',
				type: 'Escolha',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				body: 'Qual é o seu animal favorito?',
				type: 'Escolha',
				created_at: new Date(),
				updated_at: new Date(),
			},
			// Adicione mais entradas conforme necessário
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('questions', null, {});
	},
};
