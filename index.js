const fs = require('fs');
const mineflayer = require('mineflayer');
const minecraft = require('minecraft-protocol');
const colors = require("colors");
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();


let uhg = {}
uhg.dc = {}
uhg.dc.client = new Client({
  allowedMentions: { parse: [ "users", "roles" ], repliedUser: true },
  intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

uhg.dc.client.on('ready', () => {
  console.log(`Discord Bot is online!`.bold.brightGreen)
  console.log(`${uhg.dc.client.user.tag}`.bold.brightGreen)
	uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });
});
uhg.dc.client.on('error', (e) => {
  console.log(String(e).red.dim);
});

uhg.mc = {}
uhg.mc.commands = new Collection();
uhg.mc.aliases = new Collection();

require(`./minecraft/commands`)(uhg);

// uhg.mc.client = minecraft.createClient({
//   host: "play.survival-games.cz",
//   //host: "mc.hypixel.net",
//   username: "dasfhvas",
//   //username: process.env.email,
//   //password: process.env.password,
//   //auth: 'microsoft'
// });



uhg.dc.client.login(process.env.token);
