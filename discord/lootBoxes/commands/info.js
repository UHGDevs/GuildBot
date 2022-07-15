const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "info",
  allowedids: ["378928808989949964"],
  allowedroles: [],
  platform: "loot",
  queue: { name: 'Info', value: 'info', sort: 100 },
  run: async (uhg, interaction) => {
    try {
      return interaction.editReply(uhg.loot.data.info)
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'loot INFO command')] })
        return
    }
  }
}
