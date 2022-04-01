const fs = require('fs');
const colors = require("colors");
const { Client, Intents } = require('discord.js');
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
  require("./time/handler.js") (uhg)

  uhg.dc.client.on("messageCreate", require(`./discord/message.js`).bind(null, uhg));
  fs.watchFile('settings/config.json', (curr, prev) => uhg.reload(["settings"]));

  console.log("Guild bot je připraven!".bold.brightGreen)

  if (uhg.mc.client) require("./minecraft/handler.js") (uhg)

  return
})

require("./minecraft/commands.js") (uhg)
require("./discord/handler.js") (uhg)
uhg.dc.client.login(process.env.token);
