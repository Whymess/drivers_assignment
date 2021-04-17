const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  output: process.stdout,
  terminal: false,
});

const state = {};
readInterface.on("line", function (line) {
  line = line.split(" ");
  let driver = line[0];
  let name = line[1];

  if (driver === "Driver" && !state[name]) {
    state[name] = new Trip();
  }

  if (driver === "Trip") {
    let [, name, start, stop, miles] = line;
    state[name]["mins"] = state[name]["mins"] += timeDriving(start, stop);
    state[name]["miles"] = state[name]["miles"] += parseFloat(miles);
    state[name]["mph"] = speed(state[name]["miles"], state[name]["mins"]);
  }
});

readInterface.on("close", function () {
  fs.writeFile("output.txt", writeToFile(discardMph(state)), function (err) {
    if (err) {
      return console.log(err);
    }
  });
});

function speed(distance, minutes) {
  return Math.round(parseFloat(distance) / (parseFloat(minutes) / 60.0));
}

function discardMph(state) {
  for (prop in state) {
    let mph = state[prop]["mph"];
    if (mph > 100 || mph < 5) {
      delete state[prop];
    }
  }
  return state;
}

function writeToFile(state) {
  let data = "";
  for (prop in state) {
    let mph = state[prop]["mph"];
    let miles = state[prop]["miles"];
    data += `${prop}: ${miles} miles @ ${mph} mph \n`;
  }
  return data;
}

function timeDriving(start, stop) {
  let startTime = new Date(`Fri Apr 16 2021 ${start}`);
  let endTime = new Date(`Fri Apr 16 2021 ${stop}`);
  let res = Math.abs(startTime - endTime) / 1000;
  let mins = Math.floor(res / 60) % 60;
  return mins;
}

function Trip(mins, miles, mph) {
  this.mins = 0;
  this.miles = 0;
  this.mph = 0;
}

module.exports = {
  timeDriving,
  writeToFile,
  speed,
  discardMph,
};
