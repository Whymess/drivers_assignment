var functions = require("./app.js");
let state = {
  Dan: { mins: 50, miles: 39.1, mph: 47 },
  Lauren: { mins: 15, miles: 42, mph: 168 },
  Kumi: { mins: 0, miles: 0, mph: 0 },
};

describe("detect drivers and recrod history", () => {
  test("mentions drivers in the object", () => {
    expect(functions.writeToFile(state)).toMatch(/Dan/);
  });

  test("Should accept strings and calcuate the speed", () => {
    expect(functions.speed("17.3", "30")).toBeGreaterThan(0);
    expect(functions.speed("17.3", "30")).toBeTruthy();
  });

  test("Should calculate time driving", () => {
    expect(functions.timeDriving("07:15", "07:45")).toBe(30);
  });
});
