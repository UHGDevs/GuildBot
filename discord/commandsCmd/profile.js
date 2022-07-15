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
      let dcuser = interaction.options.getUser('user')
      if (dcuser) {
        user = uhg.data.verify.find(n => n._id == dcuser.id)
        if (!user) return interaction.editReply({ embeds: [new MessageEmbed().setTitle(`**Error**`).setColor('RED').setDescription(`${dcuser} není verifikovaný`)] })
        user = user.uuid
      }
      let api = await uhg.getApi(user, ["api", "hypixel", "mojang", 'guild'])
      if (api instanceof Object == false) return interaction.editReply({ embeds: [new MessageEmbed().setTitle(`**Error v api**`).setColor('RED').setDescription(api)] })

      let dUhg = uhg.mongo.run.get("general", "uhg", {uuid: api.uuid})
      let dGuilds = uhg.mongo.run.get("stats", "guild")
      let verify = await uhg.mongo.run.get("general", "verify")
      uhg.data.verify = verify

      let embed = new MessageEmbed().setTitle(`**Profil hráče ${api.hypixel.username}**`).setURL(`https://plancke.io/hypixel/player/stats/${api.hypixel.username}`).addFields(
          { name: `Username`, value: `${api.hypixel.username}`, inline: true },
          { name: `UUID`, value: `${api.hypixel.uuid}`, inline: true },
          { name: `ㅤ`, value: `ㅤ`, inline: false},
          { name: `Level`, value: `${uhg.f(api.hypixel.level)}`, inline: true },
          { name: `Rank`, value: `${api.hypixel.rank}`, inline: true},
          { name: `Last login`, value: `<t:${Math.round(api.hypixel.lastLogin/1000)}:R>`, inline: true}
      )

      if (api.hypixel.nicks.length > 1) {
        embed.addField(`${api.hypixel.nicks.length} nicks`, api.hypixel.nicks.join(', '), false)
      }

      if (api.guild.guild) embed.addFields(
        { name: `ㅤ`, value: `ㅤ`, inline: false},
        { name: `Guild`, value: `${api.guild.name}`, inline: true},
        { name: `Guild Rank`, value: `${api.guild.member.rank}`, inline: true},
        { name: `Joined`, value: `<t:${Math.round(api.guild.member.joined/1000)}:R>`, inline: true}
      )

      dGuilds = await dGuilds
      uhg.data.guild = dGuilds
      if (api.guild.name == 'UltimateHypixelGuild' || api.guild.name == 'TKJK' || api.guild.name == 'Czech Team') {
        let pGuild = dGuilds.filter(n => n.name == api.guild.name)[0]
        let member = pGuild.members.filter(n => n.uuid == api.uuid)
        if (member.length) {
          member = member[0]
          let monthlyGEXPkeys = Object.keys(member.exp.daily).filter(n => n.startsWith(new Date().toISOString().slice(0, 7)))
          let monthlyGEXP = 0
          for (let den of monthlyGEXPkeys) {
            monthlyGEXP += member.exp.daily[den] || 0
          }
          let weeklyGEXPkeys = Object.keys(pGuild.members[0].exp.daily).slice(0, new Date().getDay() || 7)
          let weeklyGEXP = 0
          for (let den of weeklyGEXPkeys) {
            weeklyGEXP += member.exp.daily[den] || 0
          }
          embed.addFields(
            { name: `WEEKLY GEXP`, value: `\`${uhg.f(weeklyGEXP)}\``, inline: true},
            { name: `MONTHLY GEXP`, value: `\`${uhg.f(monthlyGEXP)}\``, inline: true},
            { name: `TOTAL GEXP`, value: `\`${uhg.f(Object.values(member.exp.daily).reduce((a, b) => a + b))}\``, inline: true}
          )
        }
      }
      dUhg = await dUhg
      dUhg = dUhg[0]

      verify = verify.filter(n => n.uuid == api.uuid)
      embed.addField('ㅤ', 'ㅤ', false)
      if (api.hypixel.links.DISCORD) {
        let member;
        if (verify.length || dUhg) member = interaction.guild.members.cache.get(verify[0]._id || dUhg._id)
        embed.addField('Discord:', member ? `<@${member.id}>` : api.hypixel.links.DISCORD, true)
      }

      embed.addField('Verified', verify.length ? '✅':'🟥', true)

      if (api.guild.name == 'UltimateHypixelGuild' || dUhg) {
        embed.addField('UHG Database', dUhg ? '✅':'🟥' , true)
      }


      return interaction.editReply({ embeds: [embed] })
    } catch (e) {
        interaction.editReply({ embeds: [uhg.dc.cache.embeds.error(e, 'PROFILE command')] })
        return
    }
  }
}
