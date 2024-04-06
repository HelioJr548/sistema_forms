const { Model, DataTypes } = require('sequelize');

class Form extends Model {
	static init(sequelize) {
		super.init(
			{
				title: DataTypes.STRING,
				description: DataTypes.STRING,
			},
			{
				sequelize,
			}
		);
	}

	static associate(models) {
		this.belongsToMany(models.User, { through: 'user_forms' });
	}
}

module.exports = Form;
