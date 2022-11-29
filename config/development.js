module.exports = {
  port: 8080,
  logging: {
    appenders: {
      fileAppender: { type: "file", filename: "./logs/development.log" },
      console: { type: "console" },
    },
    categories: {
      default: {
        appenders: ["fileAppender", "console"],
        level: "debug",
      },
    },
  },
};
