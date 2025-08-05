const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// PostgreSQL connection
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_SERVER,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  }
);

// Define Student Table
const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
});

// Define Mark Table
const Mark = sequelize.define("Mark", {
  subject: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, allowNull: false },
});

Student.hasMany(Mark, {
  foreignKey: "studentId",
  as: "marks",
  onDelete: "CASCADE",
});
Mark.belongsTo(Student, { foreignKey: "studentId", as: "student" });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected....");
    await sequelize.sync();
    console.log("Models synced");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = {
  Student,
  Mark,
  connectDB,
};
