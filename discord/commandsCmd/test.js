const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "test",
  allowedids: ["378928808989949964"],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'Mega Najety Test', value: 'test', sort: -3 },
  run: async (uhg, interaction) => {
    try {
  
      let guild = uhg.dc.client.guilds.cache.get('455751845319802880')


      let embed = new MessageEmbed().setTitle(`MODAL test! Klikni na button`)
      const buttons = new MessageActionRow().addComponents(new MessageButton().setCustomId('create_modal_verify').setStyle('PRIMARY').setLabel('Otestuj ZDE modal'));
      interaction.editReply({ embeds: [embed], components: [buttons] })
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'TEST command')] })
        return "Chyba v cmd test příkazu!"
    }
  }
}
