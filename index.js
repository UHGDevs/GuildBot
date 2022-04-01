const fs = require('fs');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');
const Login = require('./classes/login.js')

const dotenv = require('dotenv');
dotenv.config();

let dc = new Client({
  allowedMentions: { parse: [ "users", "roles" ], repliedUser: true },
  intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

let uhg = new Login(dc)
exports.uhg = () => { return uhg }

uhg.once("ready", () => {
  if (uhg.mc.client) require("./minecraft/handler.js") (uhg)
  require("./time/handler.js") (uhg)
  //setInterval(function () {uhg.reload(["mongo"])}, 5*60*1000);
  fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));

  console.log("Guild bot je připraven!".bold.brightGreen)
  return
})

require("./minecraft/commands.js") (uhg)
require("./discord/handler.js") (uhg)
uhg.dc.client.login(process.env.token);
