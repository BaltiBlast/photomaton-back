// NPM import //
const express = require("express");
const { exec } = require("child_process");

// local import //
const { getFileName } = require("./utils/methods");

const router = express.Router();

router.get("/capture", (req, res) => {
  const fileName = getFileName();

  exec(
    `wsl gphoto2 --capture-image-and-download --filename /mnt/c/Users/fouge/Desktop/${fileName}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur : ${error.message}`);
        return res.status(500).send("Erreur lors de la capture");
      }
      if (stderr) {
        console.error(`stderr : ${stderr}`);
      }
      console.log(`Photo capturée : ${fileName}`);

      res.json({ imageUrl: `/photos/${fileName}` });
    }
  );
});

module.exports = router;
