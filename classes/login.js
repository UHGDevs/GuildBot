const { Collection } = require('discord.js');
const fs = require('fs');
const { MongoClient } = require("mongodb");

const Functions = require('./functions.js')
const Events = require('events')
class Login {
  constructor(dc, mc, mctest) {
    this.dc = {client: dc, commands: new Collection(), aliases: new Collection(), channelsids: {guild:"912776277361053758", botguild:"957005113149521930", officer: "929435160234053726", botofficer:"957005146460684299"}}
    this.mc = {client: mc, commands: new Collection(), aliases: new Collection(), send: [], ready: false}
    this.test = {server:mctest}
    this.ignore = []
    this.data = {guild:{}, verify:{}, stats:{}, uhg:{}}
    this.func = new Functions()
    this.cache = {guildjoin: new Collection()}
    this.time = {events: new Collection(), ready:JSON.parse(fs.readFileSync('settings/config.json', 'utf8')).time}
    this._event = new Events()
    this.snipe = new Collection()
    this.ready = this.load()
  }
  async load() {
    delete this.ready
    await Promise.all([this.createMongo()]);
    this._event.emit("ready")
  }

  async createMongo() {
    const mongo = new MongoClient(process.env.db);
    await mongo.connect()
    await require("../utils/mongodb").setup(mongo)
    this.mongo = {client: mongo, run: require("../utils/mongodb")}
    this.reload(["stats"])
    await this.reload()
  }

  async reload(reload=[]) {
    if (reload.includes("settings") || !reload.length) {
      let oldtime;
      if (this.settings) oldtime = this.settings.time
      this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
      if (oldtime) {
        try {
          Object.keys(this.settings.time).forEach(key => {
            if (!oldtime[key]==this.settings.time[key]) {
              if (this.settings.time[key] === true) {this.time.events.get(key).start.start(); this.time.ready[key] = true; return;}
              else this.time.events.get(key).start.stop();
            }
          });
        } catch (e) {console.log("Time event neni pripraven!"); console.log(e)}
      }
    }

    if (reload.includes("guild") || reload.includes("mongo") || !reload.length) {
      this.data.guild = await this.mongo.run.get("stats", "guild")
      this.members = []
      this.data.guild[0].members.forEach(member =>{ this.members.push(member.name) })
    }

    if (reload.includes("verify") || reload.includes("mongo") || !reload.length) {
      this.data.verify = await this.mongo.run.get("general", "verify")
    }

    if (reload.includes("stats") || reload.includes("mongo") /* || !reload.length */) {
      this.data.stats = await this.mongo.run.get("stats", "stats")
    }

    if (reload.includes("uhg") || reload.includes("mongo" || !reload.length )) {
      this.data.stats = await this.mongo.run.get("general", "uhg")
    }
  }
}


module.exports = Login
