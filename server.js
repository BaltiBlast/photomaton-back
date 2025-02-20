// NPM import //
const express = require("express");
const cors = require("cors");

// local import //
const { attachNikon } = require("./utils/methods");
const router = require("./router");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

attachNikon();

app.use(router);
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
