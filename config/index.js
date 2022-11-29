const fs = require("fs");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const config = require(path.join(__dirname, ENV));

module.exports = config;
