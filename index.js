const fs = require('fs');
const mineflayer = require('mineflayer');
const minecraft = require('minecraft-protocol');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const config = require('./settings/config.json');

class login {
  constructor(dc, mc) {
    this.dc = {client: dc}
    this.mc = {client: mc}
    this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
  }

  reload(reload="all") {
    if (reload == "settings" || reload == "all") {
      this.settings = JSON.parse(fs.readFileSync('settings/config.json', 'utf8'));
    }
  }


}

let { dc, mc } = "UHG"

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

let uhg = new login(dc, mc)

setInterval(function () {
  console.log(uhg.settings)
  uhg.reload()
}, 5000);


if (dc) {
  uhg.dc.client.on('ready', () => {
    console.log(`Discord Bot is online!`.bold.brightGreen)
    console.log(`${uhg.dc.client.user.tag}`.bold.brightGreen)
  	uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });
  });
  uhg.dc.client.on('error', (e) => {
    console.log(String(e).red.dim);
  });



  uhg.dc.client.login(process.env.token);
}
