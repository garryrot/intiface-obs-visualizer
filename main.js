// import { createLinearDeviceChart, createStrokerWSD } from "linearDevices"
// import { createScalarDeviceChart, createVibratorWsd } from "linearDevices"

let sleep = async function(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

// Main
window.addEventListener("load",  async function() {
  var strokerUpdate = createLinearDeviceChart("stroker")
  var analUpdate = createScalarDeviceChart("vibrator-anal", "Vibrator 1 (Anal)", "0, 135, 255")
  var vaginalUpdate = createScalarDeviceChart("vibrator-vaginal", "Vibrator 2 (Vaginal)", "255, 0, 247")
  var constrictorUpdateAnal = createScalarDeviceChart("fake-constrictor-anal", "Constrictor (Anal)", "120, 0, 247")
  var constrictorUpdateVaginal = createScalarDeviceChart("fake-constrictor-vaginal", "Constrictor (Vaginal)", "80, 0, 247")

  createStrokerWSD("Test-Stroker", "A9816725C", strokerUpdate)
  await sleep(2000)
  createVibratorWsd("Test-Vibrator", "A9816725B", analUpdate)
  await sleep(2000)
  createVibratorWsd("Test-Vibrator", "A9999725B", vaginalUpdate)
  await sleep(2000)
  createVibratorWsd("Test-Vibrator", "A8888725B", constrictorUpdateAnal)
  await sleep(2000)
  createVibratorWsd("Test-Vibrator", "A6666725B", constrictorUpdateVaginal)
});
