module.exports = (sequelize, DataTypes) => {
  const Turn = sequelize.define(
    "Turn",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      id_doctor: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      id_patient: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("available", "busy", "cancel", "absent doctor"),
        defaultValue: "available",
      },
      coverage: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );

  Turn.associate = function(models) {
    Turn.belongsTo(models.User, { as: 'doctor', foreignKey: 'id_doctor', });
  };

  return Turn;
};
