const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow, TextInputComponent } = require('discord.js');
const fs = require('fs');
const client = require('../../utils/client');

module.exports = {
  name: 'test',
  description: 'TEST',
  options: [
  ],
  run: async (uhg, interaction, args) => {
    try {
        const embed = new MessageEmbed()
          .setDescription("Click the **test** to test this")
          .setColor("GREEN")

        const Row = new MessageActionRow();
        Row.addComponents(
            new MessageButton()
              .setCustomId("test")
              .setStyle("SUCCESS")
              .setLabel("test")
        );

        interaction.reply({embeds: [embed], components: [Row] });
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v test slash příkazu!'
    }
  }
}
