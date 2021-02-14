const fs = require("fs").promises;
const path = require("path");
const faker = require("faker");

/**
 * Change this value to increase the test sample
 */
const TEST_CASE_SIZE = 10000;

const emptyList = new Array(TEST_CASE_SIZE).fill(null);

const fakeList = emptyList.map((v) => {
  return {
    id: faker.random.uuid(),
    title: faker.random.words(),
  };
});

fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(fakeList));
