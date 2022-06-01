const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "profile",
  allowedids: [],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'Profile', value: 'profile', sort: 2 },
  run: async (uhg, interaction) => {
    try {
      let user = interaction.options.getString('player') || interaction.member.nickname || interaction.user.username
      let api = await uhg.getApi(user, ["api", "hypixel", "mojang"])
      if (api instanceof Object == false) return api

      let embed = new MessageEmbed().setTitle(`**Profil hráče ${api.hypixel.username}**`).setURL(`https://plancke.io/hypixel/player/stats/${api.hypixel.username}`).addFields(
          { name: `Username`, value: `${api.hypixel.username}`, inline: true },
          { name: `UUID`, value: `${api.hypixel.uuid}`, inline: true },
          { name: `Level`, value: `${uhg.f(api.hypixel.level)}` },
          { name: `Rank`, value: `${api.hypixel.rank}`, inline: true},
          { name: `Last login`, value: `<t:${Math.round(api.hypixel.lastLogin/1000)}:R>`}
      )
      return interaction.editReply({ embeds: [embed] })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v cmd profile příkazu!"
    }
  }
}
