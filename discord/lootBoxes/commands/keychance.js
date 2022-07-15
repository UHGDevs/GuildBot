const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "keychance",
  allowedids: [],
  allowedroles: ["530504032708460584"],
  platform: "loot",
  queue: { name: 'KeyChance', value: 'keychance', sort: 99 },
  run: async (uhg, interaction) => {
    try {
      return interaction.editReply(uhg.loot.data.keys)
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'loot KEYCHANCE command')] })
        return
    }
  }
}
