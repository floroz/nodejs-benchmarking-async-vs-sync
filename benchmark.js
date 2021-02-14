const b = require("benny");
const { syncTask, asyncTask } = require("./app");

b.suite(
  "Testing Sync vs Async access to FS",

  b.add("Sync ReadFile", () => {
    syncTask();
  }),
  b.add("Async ReadFile", async () => {
    await asyncTask();
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "benchmark",
    folder: "benchmark",
    details: true,
    format: "json",
  })
);
