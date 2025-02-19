const express = require("express");
const { attachNikon } = require("./utils/methods");

const app = express();
const PORT = 3000;

attachNikon();

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
