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
    this.mctest = {server:mctest.server, client: mctest.mc}
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

if (config.test === true) {
  let testclient = minecraft.createClient({
    host: "localhost",
    //host: "mc.hypixel.net",
    username: "dasfhvas",
    //username: process.env.email,
    //password: process.env.password,
    //auth: 'microsoft'
  });
  mctest = {server:null, mc: testclient}
} else mctest = {}

let uhg = new login(dc, mc, mctest)

fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));


if (dc) {
  require("./discord/handler.js") (uhg)
  uhg.dc.client.login(process.env.token);
}
