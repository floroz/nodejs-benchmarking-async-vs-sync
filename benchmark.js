const b = require("benny");
const { syncTask: syncTask1, asyncTask: asyncTask1 } = require("./test-1");
const { syncTask: syncTask2, asyncTask: asyncTask2 } = require("./test-2");

b.suite(
  "Testing event-loop blocking tasks vs asynchronous tasks: concurrent tasks",

  b.add("Sync Task 1", () => {
    syncTask1();
  }),
  b.add("Async Task 1", async () => {
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
  "Testing event-loop blocking tasks vs asynchronous tasks: access file system",
  b.add("Sync Task 2", () => {
    syncTask2();
  }),
  b.add("Async Task 2", async () => {
    await asyncTask2();
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "benchmark-2",
    folder: "benchmark",
    format: "table.html",
  })
);
