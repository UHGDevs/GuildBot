const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'cmd',
  description: 'Hypixel in-game commands',
  options: [
    {
      name: "command",
      description: "Vyber si command",
      type: "STRING",
      required: true,
      autocomplete: true
    },
    {
      name: 'player',
      description: 'Vyber si hráče',
      type: 'STRING',
      required: false,
      autocomplete: true
    },
    {
      name: 'reason',
      description: 'Vyber důvod',
      type: 'STRING',
      required: false,
      //autocomplete: true
    }
  ],
  run: async (uhg, interaction, args) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {

      await interaction.editReply({ content: 'coming soon' })
      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v cmd slash příkazu!'
    }
  }
}
