module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "pegadb",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
