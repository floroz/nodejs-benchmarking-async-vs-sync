const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

const syncFile = path.join(__dirname, "sync.json");
const asyncFile = path.join(__dirname, "async.json");

function syncTask() {
  if (!fs.existsSync(syncFile)) {
    fs.writeFileSync(syncFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(path.join(__dirname, "data.json"));
  const list = JSON.parse(data.toString());

  for (const item of list) {
    const data = fs.readFileSync(syncFile).toString();
    const arr = JSON.parse(data);

    const newArr = [...arr, item];

    fs.writeFileSync(syncFile, JSON.stringify(newArr));
  }

  fs.unlinkSync(syncFile);
}

async function asyncTask() {
  if (!fs.existsSync(syncFile)) {
    await fs.writeFile(syncFile, JSON.stringify([]));
  }
  const data = await fsPromise.readFile(path.join(__dirname, "data.json"));
  const list = JSON.parse(data.toString());

  for (const item of list) {
    const buffer = await fsPromise.readFile(asyncFile);
    const arr = JSON.parse(buffer.toString());

    const newArr = [...arr, item];

    await fsPromise.writeFile(asyncFile, JSON.stringify(newArr));
  }

  await fsPromise.unlink(asyncFile);
}

module.exports = {
  syncTask,
  asyncTask,
};
