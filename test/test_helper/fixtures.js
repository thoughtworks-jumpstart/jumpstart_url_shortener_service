const loadFixture = require("mongoose-fixture-loader");
const User = require("../../src/models/User");

const fixtures = {};

function getNewUser(username, email, password) {
  const user = new User({
    username,
    email
  });
  user.setPassword(password);

  return user;
}

async function createNewUser(userName) {
  const password = "mypassword";
  const user = await loadFixture(
    User,
    getNewUser(userName, `${userName}@example.com`, password)
  );
  // store the plaintext password for the test cases to simulate login
  // this is not stored in database
  user.password = password;
  return user;
}

async function loadFixtures() {
  fixtures.users = {};
  const userNames = ["tom", "jacky"];
  for (const userName of userNames) {
    let user = await createNewUser(userName);
    fixtures.users[userName] = user;
  }
}

module.exports = {
  fixtures,
  load: loadFixtures
};
