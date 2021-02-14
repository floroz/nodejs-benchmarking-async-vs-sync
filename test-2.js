const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const os = require("os");

process.env.UV_THREADPOOL_SIZE = os.cpus().length;

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

  let data;
  try {
    data = await fsPromise.readFile(path.join(__dirname, "data.json"));
  } catch (error) {
    console.error("********** Error in reading data.json");
    throw new Error(error);
  }
  const list = JSON.parse(data.toString());

  for (const item of list) {
    let file;
    try {
      const buffer = await fsPromise.readFile(asyncFile);
      file = buffer.toString();
    } catch (error) {
      console.error("********** Error in reading async.json");
      throw new Error(error);
    }

    const { items } = JSON.parse(file);
    const newArr = [...items, item];
    try {
      await fsPromise.writeFile(asyncFile, JSON.stringify({ items: newArr }));
    } catch (error) {
      console.error("********** Error in writing to async.json");
      throw new Error(error);
    }
  }

  await fsPromise.unlink(asyncFile);
}

syncTask();

module.exports = {
  syncTask,
  asyncTask,
};
