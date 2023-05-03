const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require('./routes');

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`run server in port ${PORT}`);
});
