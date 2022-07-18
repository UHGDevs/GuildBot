const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');

const buttons = new MessageActionRow()
  .addComponents(new MessageButton().setCustomId('LBFirst').setStyle('PRIMARY').setEmoji('⏮'))
  .addComponents(new MessageButton().setCustomId('LBBack').setStyle('PRIMARY').setEmoji('◀'))
  .addComponents(new MessageButton().setCustomId('LBNext').setStyle('PRIMARY').setEmoji('▶'))
  .addComponents(new MessageButton().setCustomId('LBLast').setStyle('PRIMARY').setEmoji('⏭'));
const guildrefresh = require('../../utils/guildrefresh');
module.exports = {
  name: 'time',
  description: 'Time Event GUI',
  permissions: [{ id: '378928808989949964', type: 'USER', permission: true}],
  options: [
    {
      name: 'visibility',
      description: 'Chceš, aby odpověď byla viditělná pro ostatní?',
      type: 'BOOLEAN',
      required: false
    }
  ],
  type: 'slash',
  run: async (uhg, interaction, args) => {
    if (interaction.user.id !== '378928808989949964') return interaction.update({ type: 6 })
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {
      if (!uhg.time.events.size || uhg.time.events.size !== Object.keys(uhg.settings.time).length) return await interaction.editReply({ embeds: [new MessageEmbed().setTitle('**Time Events GUI**').setColor(5592575).setFooter({ text: 'Made with love ❤️' }).setDescription('Loading, please wait')]})
      let embed = new MessageEmbed().setTitle('**Time Events GUI**').setColor(5592575).setFooter({ text: `${Object.values(uhg.settings.time).filter(n => n).length}/${uhg.time.events.size} Time Events` })

      let desc = []
      for (let event of uhg.time.events) {
        event = event[1]
        let toggle = uhg.settings.time[event.name]
        let message = (event.emoji ? (event.emoji + ' - ') : '') + (toggle ? ('**' + event.name + '**') : event.name)
        console.log(event)
        if (toggle && event.executedAt) message = message + `<t:${Math.round(Number(new Date(event.executedAt))/1000)}:R>`
        desc.push( message )
      }

      embed.setDescription(desc.join('\n'))
      await interaction.editReply({ embeds: [embed], components: [] })

    } catch (e) {
      if (uhg.dc.cache.embeds) interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'TIME Slash Command')] })
      else console.log(String(e).bgRed + ' neni loaded')
      return "Chyba v TIME slash commandu!"
    }
  }
}
