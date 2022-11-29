const EventEmitter = require("events");

class GetRuleById extends EventEmitter {
  constructor({ rulesRepository }) {
    super();
    this.rulesRepository = rulesRepository;
  }

  execute(id) {
    console.log(id);
    this.rulesRepository
      .findById(id)
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

module.exports = GetRuleById;
