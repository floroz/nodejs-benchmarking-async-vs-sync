const b = require("benny");
const bcrypt = require("bcrypt");
const os = require("os");
const { syncTask, asyncTask } = require("./test-1");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

b.suite(
  "Testing event-loop blocking tasks vs asynchronous tasks: concurrent tasks",

  b.add("Sync Task 1", () => {
    syncTask();
  }),
  b.add("Async Task 1", async () => {
    await asyncTask();
  }),

  b.cycle(),
  b.complete(),
  b.save({
    file: "blocking-vs-non_blocking",
    folder: "benchmark",
    format: "chart.html",
  })
);
