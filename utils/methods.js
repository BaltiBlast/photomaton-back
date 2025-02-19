const { exec } = require("child_process");

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

module.exports = {
  attachNikon,
};
