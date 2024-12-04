
var LIGHT_GREEN = "0, 135, 255"
var BLUE = "255, 0, 247"
var PINK = "120, 0, 247"
var LILA = "80, 0, 247"

var WS_DEVICE_LIN = "Test-Stroker";
var WS_DEVICE_VIB = "Test-Vibrator";

let sleep = async function(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("load", async function() {
  strokerDevice(WS_DEVICE_LIN, linearChart("id0"));
  await sleep(2000);
  vibratorDevice(WS_DEVICE_VIB, scalarChart("id1", "Vibrator 1 (Anal)", LIGHT_GREEN));
  await sleep(2000);
  vibratorDevice(WS_DEVICE_VIB, scalarChart("id2", "Vibrator 2 (Vaginal)", BLUE));
  await sleep(2000);
  vibratorDevice(WS_DEVICE_VIB, scalarChart("id3", "Constrictor (Anal)", PINK));
  await sleep(2000);
  vibratorDevice(WS_DEVICE_VIB, scalarChart("id4", "Constrictor (Vaginal)", LILA));
});
