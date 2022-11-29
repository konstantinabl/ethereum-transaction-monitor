const EventEmitter = require("events");

class GetAllRules extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute() {
    this.rulesRepository
      .getAll()
      .then((newRule) => {
        this.emit("SUCCESS", newRule);
      })
      .catch((error) => {
        if (error.message === "ValidationError") {
          return this.emit("VALIDATION_ERROR", error);
        }

        this.emit("ERROR", error);
      });
  }
}

module.exports = GetAllRules;
