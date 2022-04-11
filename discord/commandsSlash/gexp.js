const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
module.exports = {
  name: 'gexp',
  description: 'testing command',
  options: [
    {
      name: "period",
      description: "Vyber si jaký časový úsek chceš vidět",
      type: "STRING",
      required: true,
      choices: [
        {
          name: 'monthly',
          value: 'monthly',
        },
        {
          name: 'weekly',
          value: 'weekly',
        },
        {
          name: 'daily',
          value: 'daily',
        }
      ]
    },
  ],
  run: async (uhg, interaction, args) => {
    try {
      console.log(interaction.options.getString('period'))
      interaction.followUp({ content:'Ahoj' })

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v gexp příkazu!"
    }
  }
}
