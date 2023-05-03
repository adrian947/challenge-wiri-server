const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require('./src/routes');
const db = require('./src/database/models');

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`run server in port ${PORT}`);
});
