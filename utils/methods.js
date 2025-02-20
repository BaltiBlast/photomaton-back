// NPM import //
const { exec } = require("child_process");

let photoIndex = 1;

// ------------------------------------------------------------------------------------------
// get Nikon 5200 busid dynamically and attach it
function attachNikon() {
  // get list of devices
  exec("usbipd list", (error, stdout) => {
    if (error) {
      console.error(`Erreur lors de la récupération du BUSID : ${error.message}`);
      return;
    }

    // extract Nikon 5200 busid
    const match = stdout.match(/(\d+-\d+)\s+.*5200.*/);
    if (match) {
      console.log("Nikon 5200 detected ✅");

      // extract busid
      const busid = match[1];
      console.log("busid extracted ✅");

      exec(`usbipd attach --wsl --busid ${busid}`, (error) => {
        if (error && error.code === 1) {
          console.log("Device already attached ✅");
          return;
        } else {
          console.log("Device attached ✅");
          return;
        }
      });
    } else {
      console.log("Nikon 5200 was not detected.");
    }
  });
}

// ------------------------------------------------------------------------------------------
// file name management
function getFileName() {
  const now = new Date();
  const formattedTime = `${now.getHours()}h${now.getMinutes().toString().padStart(2, "0")}`;

  const fileName = `photo${photoIndex}_${formattedTime}.nef`;
  photoIndex++;

  return fileName;
}

module.exports = {
  attachNikon,
  getFileName,
};
