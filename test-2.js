const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");

const syncFile = path.join(__dirname, "sync.json");
const asyncFile = path.join(__dirname, "async.json");

function syncTask() {
  if (!fs.existsSync(syncFile)) {
    fs.writeFileSync(syncFile, JSON.stringify({ items: [] }));
  }
  const data = fs.readFileSync(path.join(__dirname, "data.json"));
  const list = JSON.parse(data.toString());

  for (const item of list) {
    const data = fs.readFileSync(syncFile).toString();
    const { items } = JSON.parse(data);

    const newArr = [...items, item];

    fs.writeFileSync(syncFile, JSON.stringify({ items: newArr }));
  }

  fs.unlinkSync(syncFile);
}

async function asyncTask() {
  if (!fs.existsSync(asyncFile)) {
    await fsPromise.writeFile(asyncFile, JSON.stringify({ items: [] }));
  }

  const data = await fsPromise.readFile(path.join(__dirname, "data.json"));
  const list = JSON.parse(data.toString());

  for (const item of list) {
    const buffer = await fsPromise.readFile(asyncFile);
    const file = buffer.toString();

    const { items } = JSON.parse(file);
    const newArr = [...items, item];
    await fsPromise.writeFile(asyncFile, JSON.stringify({ items: newArr }));
  }

  await fsPromise.unlink(asyncFile);
}

module.exports = {
  syncTask,
  asyncTask,
};
