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
      description: 'Napiš jméno nebo uuid hráče',
      type: 'STRING',
      required: false,
      //autocomplete: true
    },
    {
      name: 'user',
      description: 'Vyber hráče na discordu',
      type: 'USER',
      required: false,
      //autocomplete: true
    },
    {
      name: 'visibility',
      description: 'Chceš, aby odpověď byla viditělná pro ostatní?',
      type: 'BOOLEAN',
      required: false
    }
  ],
  run: async (uhg, interaction, args) => {
    let ephemeral = !interaction.options.getBoolean('visibility')
    await interaction.deferReply({ ephemeral: ephemeral }).catch(() => {});
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
