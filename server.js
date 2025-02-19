// NPM import //
const express = require("express");

// local import //
const { attachNikon } = require("./utils/methods");
const router = require("./router");

const app = express();
const PORT = 3000;

attachNikon();

app.use(router);
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
