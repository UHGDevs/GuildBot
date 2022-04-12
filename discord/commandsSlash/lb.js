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
      required: true,
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
    try {
      Array.prototype.chunk = uhg.chunk
      let game = interaction.options.getString('game')
      let stat = interaction.options.getString('stat')
      let gamemode = interaction.options.getString('gamemode') || null

      console.log(stat)

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v lb příkazu!"
    }
  }
}
