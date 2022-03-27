const { Collection } = require('discord.js');
const fs = require('fs');

class Sniper {
  constructor(uhg, api, notify) {
    this.uhg = uhg
    this._id = "unknown"
    this.username = api.username
    this.uuid = api.uuid
    this.notify = notify
    this.setup = this.setup()
  }

  setup() {
    delete this.setup
    if (this.notify === false) delete this.notify
  }
  run() {
    console.log("NOW the MAGIC comes")
  }
}


module.exports = Sniper
