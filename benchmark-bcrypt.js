const b = require("benny");
const bcrypt = require("bcrypt");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

/**
 * CPU intensive work
 */
b.suite(
  "Bcrypt Sync vs Async",
  b.add("Bcrypt Sync", () => {
    bcrypt.hashSync("secret", 10);
  }),
  b.add("Bcrypt Async", async () => {
    await bcrypt.hash("secret", 10);
  }),
  b.cycle(),
  b.complete(),
  b.save({
    file: "bcrypt",
    folder: "benchmark",
    format: "chart.html",
  })
);
