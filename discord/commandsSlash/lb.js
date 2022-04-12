const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');

const buttons = new MessageActionRow()
  .addComponents(new MessageButton().setCustomId('LBFirst').setStyle('PRIMARY').setEmoji('⏮'))
  .addComponents(new MessageButton().setCustomId('LBBack').setStyle('PRIMARY').setEmoji('◀'))
  .addComponents(new MessageButton().setCustomId('LBNext').setStyle('PRIMARY').setEmoji('▶'))
  .addComponents(new MessageButton().setCustomId('LBLast').setStyle('PRIMARY').setEmoji('⏭'));
const guildrefresh = require('../../utils/guildrefresh');
module.exports = {
  name: 'lb',
  description: 'testing command',
  options: [
    {
      name: "minigame",
      description: "Vyber si minihru",
      type: "STRING",
      required: true,
      choices: [
        {
          name: 'bedwars',
          value: 'bedwars',
        },
        {
          name: 'skywars',
          value: 'skywars',
        }
      ]
    },
    {
      name: 'stat',
      description: 'Vyber si stat, který chceš vidět',
      type: 'STRING',
      required: false,
      autocomplete: true
    },
    {
      name: 'gamemode',
      description: 'Vyber si gamemode, který chceš vidět',
      type: 'STRING',
      required: false,
      autocomplete: true
    }
  ],
  run: async (uhg, interaction, args) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {
      Array.prototype.chunk = uhg.chunk
      let game = interaction.options.getString('minigame')
      let stat = interaction.options.getString('stat') || 'level'
      let gamemode = interaction.options.getString('gamemode') || 'overall'

      let data = uhg.data.stats || await uhg.mongo.run.get("stats", "stats")

      data.forEach(player => {
        let gamemode_api = player[game][gamemode]  || player[game]
        console.log(gamemode_api)
        let stats = gamemode_api[stat]
        console.log(player.username + ": " + stats)
      });

      //console.log(data[0])

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v lb příkazu!'
    }
  }
}
