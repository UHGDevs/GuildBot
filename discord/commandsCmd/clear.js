const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "clear",
  allowedids: [ "419183469911080960", "378928808989949964"],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'Clear', value: 'clear', sort: 200 },
  run: async (uhg, interaction) => {
    try {
      let amount = interaction.options.getNumber("amount")
      if (!amount) { return interaction.editReply({ embeds: [new MessageEmbed().setTitle("Missing amount")] })}
      let actualAmount = amount
      while (actualAmount > 100) {
        //interaction.channel.bulkDelete(100, true)
        actualAmount = actualAmount - 100
      }
      //interaction.channel.bulkDelete(actualAmount, true)
      interaction.editReply({ embeds: [new MessageEmbed().setTitle(`(ne)Odstranil jsi ${amount} zpráv`)] })
      //return interaction.editReply({ embeds: [embed] })                                                             naco tu je toto?   
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'CLEAR command')] })
        return
    }
  }
}
