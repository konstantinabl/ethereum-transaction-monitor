module.exports = {
  port: process.env.PORT,
  logging: {
    appenders: {
      fileAppender: { type: "file", filename: "./logs/development.log" },
      console: { type: "console" },
    },
    categories: {
      default: {
        appenders: ["fileAppender", "console"],
        level: "info",
      },
    },
  },
};
