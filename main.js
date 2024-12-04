
var LIGHT_GREEN = "0, 135, 255"
var BLUE = "255, 0, 247"
var PINK = "120, 0, 247"
var LILA = "80, 0, 247"

let sleep = async function(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("load", async function() {
  strokerDevice("Test-Stroker", linearChart("stroker"));
  await sleep(2000);
  vibratorDevice("Test-Vibrator", scalarChart("vibrator-anal", "Vibrator 1 (Anal)", LIGHT_GREEN));
  await sleep(2000);
  vibratorDevice("Test-Vibrator", scalarChart("vibrator-vaginal", "Vibrator 2 (Vaginal)", BLUE));
  await sleep(2000);
  vibratorDevice("Test-Vibrator", scalarChart("fake-constrictor-anal", "Constrictor (Anal)", PINK));
  await sleep(2000);
  vibratorDevice("Test-Vibrator", scalarChart("fake-constrictor-vaginal", "Constrictor (Vaginal)", LILA));
});
