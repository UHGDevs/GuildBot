const { Collection } = require('discord.js');
const fs = require('fs');
const { MongoClient } = require("mongodb");

const Functions = require('./functions.js')
class Login extends Functions {
  constructor(dc) {
    super()
    this.dc = {client: dc, commands: new Collection(), aliases: new Collection(), slash: new Collection(), cmd: new Collection(), loot: new Collection(), cache: {}}
    this.mc = {client: null, commands: new Collection(), aliases: new Collection(), send: [], ready: false}
    this.test = {server:null}
    this.ignore = []
    this.data = {guild:[], verify:[], stats:[], uhg:[]}
    this.cache = {guildjoin: new Collection()}
    this.time = {events: new Collection(), ready:JSON.parse(fs.readFileSync('settings/config.json', 'utf8')).time}
    this.snipe = new Collection()
    this.info = {path: require.main.path + '/'}
    this.loot = {}
    this.ready = this.load()
  }
  async load() {
    delete this.ready
    this.reload(["settings", 'loot'])
    await Promise.all([this.createMongo()]);
    require("../utils/client.js")(this)
    require('../utils/embeds.js')(this)
    this.emit("ready")
  }

  async createMongo() {
    const mongo = new MongoClient(process.env.db);
    await mongo.connect()
    await require("../utils/mongodb").setup(mongo)
    this.mongo = {client: mongo, run: require("../utils/mongodb")}
    await this.reload(["mongo"])
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

    if (reload.includes("stats") || reload.includes("mongo")  || !reload.length) {
      this.data.stats = await this.mongo.run.get("stats", "stats")
    }

    if (reload.includes("uhg") || reload.includes("mongo") || !reload.length ) {
      this.data.uhg = await this.mongo.run.get("general", "uhg")
    }

    if (reload.includes("loot") || !reload.length ) {
      let req = Object.keys(require.cache).filter(n => n == require.main.path+'/settings/values/lootBoxes.js')
      if (req.length) delete require.cache[req[0]]
      let lootData = require('../settings/values/lootBoxes')
      this.loot.data = lootData 
    }
  }

  restartbot() {
    if (this.mc.client) this.mc.client.end()
    require("../utils/client")(this)
    require("../minecraft/handler.js")(this)
    return "Bot byl úspěšně restartován"
  }

  dcsend(message, where='bot') {
    if (typeof message !== 'string' || !message.length) return false
    let channel;
    if (Number(where)) channel = this.dc.client.channels.cache.get(where)
    else channel = this.dc.cache.channels.get(where)
    if (!channel) return false
    channel.send(message)
    return true
  }
}


module.exports = Login
