const { Collection } = require('discord.js');
const fs = require('fs');

class Sniper {
  constructor(uhg, api, notify) {
    this.uhg = uhg
    this.username = api.username
    this.uuid = api.uuid
    this.notify = notify
    this.setup = setup()
  }

  setup() {
    delete this.setup
    if (this.notify === false) delete this.notify
    this.uhg._event.emit("sniper added", this)
    console.log(this)
  }
}


module.exports = Sniper
