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
      name: 'option1',
      description: 'Vyber option 1',
      type: 'STRING',
      required: false,
      autocomplete: true
    },
    {
      name: 'option2',
      description: 'Vyber option 2',
      type: 'STRING',
      required: false,
      //autocomplete: true
    }
  ],
  run: async (uhg, interaction, args) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {
      let command = interaction.options.getString('command')

      if (command == 'notmember') return interaction.editReply({ content: 'Připoj se do UHG, nebo si nějak jinak sežeň commandy!!' })
      else if (command == 'err') return interaction.editReply({ content: 'Počkej prosím chvíli (než se zapne bot)' })

      let cmd = uhg.dc.cmd.get(command)
      if (cmd) cmd.run(uhg, interaction)
      else interaction.editReply({ content: 'coming soon' })
      return



      await interaction.editReply({ content: 'coming soon' })
      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v cmd slash příkazu!'
    }
  }
}
