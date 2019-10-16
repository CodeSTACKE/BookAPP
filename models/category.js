module.exports = function (sequelize, DataTypes) {
      var Category = sequelize.define("Category", {
            category: {
                  type: DataTypes.STRING,
                  allowNull: false,

            }
      });
      return Category;
}
