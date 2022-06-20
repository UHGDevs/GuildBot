const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "profile",
    aliases: ["p"],
    allowedids: [],
    platform: "dc",
    run: async (uhg, message, content) => {
      try {
        let args = content.split(" ").filter(n => n)
        console.log(content)
        console.log(message)
        let args1 = args[0] || message.author.username

        let api = await uhg.getApi(args1, ["api", "hypixel", "mojang", "guild"])
        if (api instanceof Object == false) return api

        let dUhg = uhg.mongo.run.get("general", "uhg", {uuid: api.uuid})
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

      dUhg = await dUhg
      dUhg = dUhg[0]

      verify = verify.filter(n => n.uuid == api.uuid)
      embed.addField('ㅤ', 'ㅤ', false)
      if (api.hypixel.links.DISCORD) {
        let member;
        embed.addField('Discord:', member ? `<@${member.id}>` : api.hypixel.links.DISCORD, true)
      }

      embed.addField('Verified', verify.length ? '✅':'🟥', true)

      if (api.guild.name == 'UltimateHypixelGuild' || dUhg) {
        embed.addField('UHG Database', dUhg ? '✅':'🟥' , true)
      }
        message.channel.send({ embeds: [embed] })

      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v profile příkazu!"
      }
    }
  }
