const fs = require('fs');
const minecraft = require('minecraft-protocol');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');
const Functions = require('./utils/functions.js')

const dotenv = require('dotenv');
dotenv.config();

const config = require('./settings/config.json');

class Login {
  constructor(dc, mc, mctest) {
    this.dc = {client: dc, commands: new Collection(), aliases: new Collection(), channelsids: {guild:"957005113149521930", officer:"957005146460684299"}}
    this.mc = {client: mc, commands: new Collection(), aliases: new Collection(), send: [], ready: false}
    this.test = {server:mctest}
    this.members = []
    this.ignore = []
    this.settings = {}
    this.mongo = require("./utils/mongodb.js")
    this.data = {guild:{}, verify:{}, stats:{}, uhg:{}}
    this.func = new Functions()
    this.cache = {guildjoin: new Collection()}
    this.time = {events: new Collection(), ready:JSON.parse(fs.readFileSync('settings/config.json', 'utf8')).time}
  }
  async reload(reload=[]) {
    if (reload.includes("settings") || !reload.length) {
      let oldtime = this.settings.time
      this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
      if (!oldtime) return
      try {
        Object.keys(this.settings.time).forEach(key => {
          if (oldtime[key]==this.settings.time[key]) return
          if (this.settings.time[key] === true) {this.time.events.get(key).start.start(); uhg.time.ready[key] = true; return;}
          else return this.time.events.get(key).start.stop();
        });
      } catch (e) {console.log("Time event neni pripraven!"); console.log(e)}


    }
    if (reload.includes("guild") || reload.includes("mongo") || !reload.length) {
      this.data.guild = await this.mongo.get("stats", "guild")
      this.members = []
      this.data.guild[0].members.forEach(member =>{ this.members.push(member.name) })

    }
    if (reload.includes("verify") || reload.includes("mongo") || !reload.length) {
      this.data.verify = await this.mongo.get("general", "verify")
    }
    if (reload.includes("stats") || reload.includes("mongo") || !reload.length) {
      this.data.stats = await this.mongo.get("stats", "stats")
    }
    if (reload.includes("uhg") || reload.includes("mongo" || !reload.length )) {
      this.data.stats = await this.mongo.get("general", "uhg")
    }
  }


}

let { dc, mc, mctest } = "UHG"


if (config.discord === true) {
  dc = new Client({
    allowedMentions: { parse: [ "users", "roles" ], repliedUser: true },
    intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  });
}
if (config.minecraft === true) {
  mc = minecraft.createClient({
  //  host: "play.survival-games.cz",
  //  username: "dasfhvas",
    host: "mc.hypixel.net",
    username: process.env.email,
    password: process.env.password,
    auth: 'microsoft'
  });
}

if (config.test === true && config.minecraft !== true) {
  const squid = require('flying-squid');
  mctest = squid.createMCServer({
      motd: 'A Minecraft Server \nRunning flying-squid',
      port: 25565,
      'max-players': 10,
      'online-mode': false,
      logging: false,
      gameMode: 1,
      difficulty: 1,
      worldFolder: undefined,
      generation: {
         name: 'superflat',
         options: {
            worldHeight: 80
         },
      },
      kickTimeout: 10000,
      plugins: {},
      modpe: false,
      'view-distance': 2,
      'player-list-text': {
         header: { text: 'aaaaaaaa' },
         footer: { text: 'Test server' },
      },
      'everybody-op': true,
      'max-entities': 100,
      version: '1.16.1',
   });
  mc = minecraft.createClient({
   host: "localhost",
   port: 25565,
   username: "Technoblade",
   version: "1.16.1",
  });
}

let uhg = new Login(dc, mc, mctest)
uhg.reload()

let utils = fs.readdirSync(`utils/`).filter((file) => file.endsWith(".js"))
console.log(`${utils.length} utils prepared`.brightGreen)

fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));

setInterval(function () {uhg.reload(["mongo"])}, 30000);

exports.uhg = () => { return uhg }

require("./time/handler.js") (uhg)
if (uhg.mc.client) {
  require("./minecraft/handler.js") (uhg)
  require("./minecraft/commands.js") (uhg)
}
if (uhg.dc.client) {
  require("./discord/handler.js") (uhg)
  uhg.dc.client.login(process.env.token);
}
