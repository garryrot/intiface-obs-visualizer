
createLinearDeviceChart = function(canvasElementId) {
    const ctx = document.getElementById(canvasElementId ).getContext("2d");
    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Stroker"],
        datasets: [
          {
            label: "Linear (Position)",
            data: [0],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            barThickness: 45
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: false,
              text: "Category",
            },
          },
          y: {
            min: 0,
            max: 1,
            title: {
              display: true,
              text: "Strength (0 to 1)",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

  // update function
  return (newValue) => {
    if (newValue < 0 || newValue > 1) {
      console.error("Value must be between 0 and 1.");
      return;
    }
    barChart.data.datasets[0].data[0] = newValue; // Update the bar value
    barChart.update(); // Refresh the chart to reflect changes
  };
}

createStrokerWSD = function(identifier, address, updateFn) {
    let ws = new WebSocket("ws://127.0.0.1:54817");
  
    ws.addEventListener("open", (socket) => {
      console.log("Connected");
      ws.send(JSON.stringify( {
        identifier: identifier,
        address: address,
        version: 0
      }));
      console.log("Handshake Sent");
  
      var lastInterval = null;
      var lastTarget = 0;
      var currentTarget = 0;
      ws.addEventListener("message", async (event) => {
        let msg = await event.data.text();
        console.log(msg);
  
        let pos = parseInt(msg.split("L")[1].split("I")[0]) / 100;
        let ms_max = msg.split("L")[1].split("I")[1];
  
        lastTarget = currentTarget;
        currentTarget = pos;
        let distance = currentTarget - lastTarget;
  
        if (lastInterval !== null) {
          clearInterval(lastInterval);
        }
  
        let steps = (ms_max / 50);
        let i = 0;
        lastInterval = setInterval(() => {
          i += 1;
          var currentStrokerPosition = lastTarget + (distance * ( i / steps ));
          updateFn(currentStrokerPosition)
        }, 45 );
      });
    });
  }
  