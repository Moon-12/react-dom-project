const { version, author } = require("../../package.json");

export const environment = {
  version: version,
  appName: "My Portfolio",
  author: author.name,
  email: author.email,
};
