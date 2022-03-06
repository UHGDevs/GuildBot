const fs = require('fs');
const mineflayer = require('mineflayer');
const { Client, Intents, Collection, Util, WebhookClient, MessageEmbed } = require('discord.js');

const uhg = {}

const dotenv = require('dotenv');
dotenv.config();

uhg.client = new Client({
  allowedMentions: { parse: [ "users", "roles" ], repliedUser: true },
  intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

uhg.mccommands = new Collection();
uhg.mcaliases = new Collection();

console.log("POG")

uhg.client.login(process.env.token);
