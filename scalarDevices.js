var randomId = () => {
    return "A981" + (Math.floor(Math.random() * 8000) + 1000).toString() + "A" 
};

scalarChart = function( canvasElementId, description, color ) {
    var updateValue;
    new Chart(
      document.getElementById(canvasElementId),
      {
        type: 'line',
        data: {
          datasets: [
            {
              label: description,
              cubicInterpolationMode: 'monotone',
              data: [],
              backgroundColor: "rgba(" + color + ", 0.3)",
              borderColor: "rgba(" + color + ", 1)",
              fill: true
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          pointStyle: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              type: 'realtime',
              grid: {
                display: true,
              },
              ticks: {
                display: true,
              },  
              realtime: {
                duration: 10000,
                refresh: 50,
                delay: 0,
                onRefresh: chart => {
                  const now = Date.now();
                  chart.data.datasets.forEach(dataset => {
                    dataset.data.push({
                      x: now,
                      y: updateValue
                    });
                  });
                }
              }
            },
            y: {
              title: {
                display: true,
                test: description
              },
              ticks: {
                display: true,
              },            
              grid: {
                display: true
              },
              min: 0,
              max: 1.0
            }
          },
          interaction: {
            intersect: false
          }
        }
      }
    )
    return (newValue) => {
      updateValue = newValue
    }
  }
  
vibratorDevice = function(identifier, updateFn) {
    let ws = new WebSocket("ws://127.0.0.1:54817");
    // When we open, send handshake and setup event handlers
    ws.addEventListener("open", (socket) => {
      console.log("Connected");
      ws.send(JSON.stringify({
        identifier: identifier,
        address: randomId(),
        version: 0
      }));
      console.log("Handshake Sent");
      ws.addEventListener("message", async (event) => {
        
        let msg = await event.data.text();
        console.log(msg);
        if (msg.indexOf("DeviceType;") !== -1) {
          console.log("got device type");
          console.log(`Z:10:${deviceAddress};`);
          // Lovense initialization request
          ws.send(`Z:10:${deviceAddress};`);
        } else if (msg.indexOf("Battery;") !== -1) {
          console.log("Got battery");
          // Buttplug will wait for a response to Battery so just make something up.
          ws.send("90;");
        } else {
          console.log(`Lovense command: ${msg}`);
          // If it's a vibrate message, get the vibrate level, which will be 0-20.
          let regex = /Vibrate:([0-9]+)/;
          let match = msg.match(regex);
          if (match.length > 1) {
            console.log(match[1]);
            updateFn(match[1] / 20.0)
          }
          //document.getElementById("lovense-output").innerHTML = msg;
          // If we wanted to conform with the Lovense protocol we'd send "OK;" here, but Buttplug doesn't care.
        }
      });
    });
  }