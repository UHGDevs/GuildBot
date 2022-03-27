const fs = require('fs');
const minecraft = require('minecraft-protocol');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');
const Login = require('./classes/login.js')

const dotenv = require('dotenv');
dotenv.config();

const config = require('./settings/config.json');

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
uhg.reload(["settings"])

let utils = fs.readdirSync(`utils/`).filter((file) => file.endsWith(".js"))
console.log(`${utils.length} utils prepared`.brightGreen)

fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));

//setInterval(function () {uhg.reload(["mongo"])}, 30000);

exports.uhg = () => { return uhg }

require("./time/handler.js") (uhg)
require("./minecraft/commands.js") (uhg)
if (uhg.mc.client) {
  require("./minecraft/handler.js") (uhg)
}
if (uhg.dc.client) {
  require("./discord/handler.js") (uhg)
  uhg.dc.client.login(process.env.token);
}
