const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

const someTaskFilePath = path.join(__dirname, "some-task.json");
const someOtherTaskFilePath = path.join(__dirname, "some-other-task.json");

function createResources() {
  fs.writeFileSync(someTaskFilePath, JSON.stringify(""));
  fs.writeFileSync(someOtherTaskFilePath, JSON.stringify(""));
}

async function doSomeAsyncStuff() {
  fsPromise.readFile(someTaskFilePath);

  fsPromise.writeFile(someOtherTaskFilePath, JSON.stringify("something"));
}

function doSomeSyncStuff() {
  fs.readFileSync(someTaskFilePath);
  fs.writeFileSync(someOtherTaskFilePath, JSON.stringify("something"));
}

function syncTask() {
  createResources();
  const data = fs.readFileSync(path.join(__dirname, "data.json"));
  const json = JSON.parse(data.toString());

  for (const _ of json) {
    doSomeSyncStuff();
  }
}

async function asyncTask() {
  createResources();
  const buffer = await fsPromise.readFile(path.join(__dirname, "data.json"));
  const json = JSON.parse(buffer.toString());

  for (const _ of json) {
    doSomeAsyncStuff();
  }
}

module.exports = {
  syncTask,
  asyncTask,
};
