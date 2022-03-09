const fs = require('fs');
const mineflayer = require('mineflayer');
const minecraft = require('minecraft-protocol');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const config = require('./settings/config.json');

class login {
  constructor(dc, mc, mctest) {
    this.dc = {client: dc}
    this.mc = {client: mc}
    this.test = {server:mctest}
    this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
  }

  reload(reload=[]) {
    if (!reload.length || reload.includes("settings")) {
      this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
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
    host: "play.survival-games.cz",
    //host: "mc.hypixel.net",
    username: "dasfhvas",
    //username: process.env.email,
    //password: process.env.password,
    //auth: 'microsoft'
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
         name: 'diamond_square',
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

let uhg = new login(dc, mc, mctest)

fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));


if (dc) {
  require("./discord/handler.js") (uhg)
  uhg.dc.client.login(process.env.token);
}
