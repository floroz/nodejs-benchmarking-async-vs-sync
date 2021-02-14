const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

function syncTask() {
  fs.writeFileSync(path.join(__dirname, "task.json"), JSON.stringify([]));
  const data = fs.readFileSync(path.join(__dirname, "data.json"));
  const json = JSON.parse(data.toString());

  const filepath = path.join(__dirname, "task.json");

  for (const item of json) {
    const file = fs.readFileSync(filepath);
    const arr = JSON.parse(file.toString());

    const newArr = [...arr, item];

    fs.writeFileSync(filepath, JSON.stringify(newArr));
  }
  fs.unlinkSync(path.join(__dirname, "task.json"));
}

async function asyncTask() {
  await fsPromise.writeFile(
    path.join(__dirname, "task.json"),
    JSON.stringify([])
  );
  const buffer = await fsPromise.readFile(path.join(__dirname, "data.json"));
  const json = JSON.parse(buffer.toString());

  const filepath = path.join(__dirname, "task.json");

  for (const item of json) {
    const data = await fsPromise.readFile(filepath);

    const arr = JSON.parse(data.toString());

    const newArr = [...arr, item];

    await fsPromise.writeFile(filepath, JSON.stringify(newArr));
  }

  await fsPromise.unlink(path.join(__dirname, "task.json"));
}

module.exports = {
  syncTask,
  asyncTask,
};
