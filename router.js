// NPM import //
const express = require("express");
const { google } = require("googleapis");
const { exec } = require("child_process");
require("dotenv").config();

// local import //
const { getFileName } = require("./utils/methods");
const credentials = require("./credentials.json");
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const router = express.Router();

router.get("/capture", (req, res) => {
  const fileName = getFileName();

  exec(
    `wsl gphoto2 --capture-image-and-download --filename /mnt/g/Mon\\ Drive/Anniversaire\\ Balti\\ 2025/${fileName}`,
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

router.post("/add-to-drive", async (req, res) => {
  const { email } = req.body;

  try {
    const client = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: client });

    // ID du dossier Google Drive où vous souhaitez ajouter l'utilisateur
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    // Ajouter l'utilisateur au dossier
    await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        role: "reader", // Ou 'reader' si vous voulez seulement permettre la lecture
        type: "user",
        emailAddress: email,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Erreur :", error);
    console.error("Détails de l'erreur :", error.response); // <-- Ajoute ceci
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
