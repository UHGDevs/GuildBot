const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "omluvenky",
  allowedids: ["378928808989949964"],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'Vypíše všechny membery', value: 'omluvenky', sort: -4 },
  run: async (uhg, interaction) => {
    try {
      let nicknames = []
      uhg.data.uhg.forEach(n => nicknames.push(`\`${n.username}\``))

console.log(nicknames)
      interaction.editReply({ embeds: [new MessageEmbed().setTitle(`Processing!`).setDescription(nicknames.join('\n'))] })
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'ALLMEMBERS command')] })
        return "Chyba v cmd allmembers příkazu!"
    }
  }
}
