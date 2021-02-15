const b = require("benny");
const os = require("os");
const { syncTask, asyncTask } = require("./test-2");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

b.suite(
  "Testing event-loop blocking tasks vs asynchronous tasks: access file system",
  b.add("Sync Task 2", () => {
    syncTask();
  }),
  b.add("Async Task 2", async () => {
    await asyncTask();
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "file-system",
    folder: "benchmark",
    format: "chart.html",
  })
);
