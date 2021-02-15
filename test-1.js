const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");

const sync_task_path = path.join(__dirname, "sync-task.json");
const async_task_path = path.join(__dirname, "async-task.json");

function blockingSyncWork() {
  fs.readFileSync(sync_task_path);
  fs.writeFileSync(sync_task_path, JSON.stringify("something"));
}

function syncTask() {
  fs.writeFileSync(sync_task_path, JSON.stringify(""));
  const data = fs.readFileSync(path.join(__dirname, "data.json"));
  const json = JSON.parse(data.toString());

  for (const _ of json) {
    blockingSyncWork();
  }

  fs.unlinkSync(sync_task_path);
}

async function nonBlockingAsyncWork() {
  fsPromise.readFile(async_task_path);

  fsPromise.writeFile(async_task_path, JSON.stringify("something"));
}

async function asyncTask() {
  await fsPromise.writeFile(async_task_path, JSON.stringify(""));
  const buffer = await fsPromise.readFile(path.join(__dirname, "data.json"));
  const json = JSON.parse(buffer.toString());

  for (const _ of json) {
    nonBlockingAsyncWork();
  }

  await fsPromise.unlink(async_task_path);
}

module.exports = {
  syncTask,
  asyncTask,
};
