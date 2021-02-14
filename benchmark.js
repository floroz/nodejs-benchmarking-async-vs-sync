const b = require("benny");
const { syncTask: syncTask1, asyncTask: asyncTask1 } = require("./test-1");
const { syncTask: syncTask2, asyncTask: asyncTask2 } = require("./test-2");

b.suite(
  "Testing event-loop blocking tasks vs asynchronous tasks",

  b.add("Sync ReadFile", () => {
    syncTask1();
  }),
  b.add("Async ReadFile", async () => {
    await asyncTask1();
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "benchmark-1",
    folder: "benchmark",
    format: "table.html",
  })
);

b.suite(
  "Testing Sync vs Async access to FS",

  b.add("Sync ReadFile", () => {
    syncTask1();
  }),
  b.add("Async ReadFile", async () => {
    await asyncTask1();
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "benchmark-2",
    folder: "benchmark",
    format: "table.html",
  })
);
