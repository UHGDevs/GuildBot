const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "verify",
  allowedids: ["378928808989949964"],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'Verify', value: 'verify', sort: 3 },
  run: async (uhg, interaction) => {
    try {
      let nickname = interaction.options.getString('player')
      if (!nickname) return interaction.editReply({ content: 'Zadej prosím jméno hráče (položka player)' })
      let dc_user = interaction.options.getUser('user')

      let guild = uhg.dc.client.guilds.cache.get('455751845319802880')
      let id = interaction.user.id
      let auth = ["312861502073995265", "427198829935460353", "378928808989949964", "379640544143343618"]

      let user;
      let coment = ''

      if (dc_user && auth.includes(id)) {
        user = guild.members.cache.get(dc_user.id) || interaction.guild.members.cache.get(dc_user.id)
        id = user.id
      }

      let api = await uhg.getApi(nickname, ["key", "hypixel", "mojang", "guild"])
      if (api instanceof Object == false) return interaction.editReply({ content: api })

      let member = user || guild.members.cache.get(id) || interaction.guild.members.cache.get(id)
      let dcusername = api.username

      if (!user && api.hypixel.links.DISCORD != `${member.user.username}#${member.user.discriminator}`) return interaction.editReply({ content: "Nemáš discord propojený s hypixelem!" })

      if (member.guild.id === '455751845319802880') {
        try { await member.setNickname(dcusername) } catch (e) {coment = coment + 'Neprošla změna jména\n'}

        if (!member._roles.includes("478816107222925322")) await member.roles.add( guild.roles.cache.get("478816107222925322"))

        let cache = uhg.dc.cache.uhgroles
        let rGMember = cache.get("Guild Member")

        if (api.guild.name === "UltimateHypixelGuild") {
          let grole = "Guild " + api.guild.member.rank
          if (grole == "Guild Guild Master") grole = "Guild Master"
          if (!member._roles.includes(rGMember.id)) try { await member.roles.add(rGMember.role) } catch (e) {coment = coment + 'Nepodařilo se dát guild member role na UHG dc\n'}
          for (let role of cache) {
            if (role[0] == "Guild Member" || role[0] == "🌙Default🌙") continue
            role = role[1]
            if (member._roles.includes(role.id) && role.name!=grole) try { await member.roles.remove(role.role) } catch (e) {coment = coment + 'Nepodařilo se odebrat roli'}
            else if (!member._roles.includes(role.id) && role.name == grole) {try { await member.roles.add(role.role) } catch (e) {coment = coment + 'Nepodařilo se přidat roli'}}
          }
        } else {
          for (let role of cache) {
            if (role[0] == "🌙Default🌙") continue
            role = role[1]
            if (member._roles.includes(role.id)) {try { await member.roles.remove(role.role) } catch (e) {coment = coment + 'Nepodařilo se odebrat roli'}}
          }
        }
      }

      let verified = await uhg.mongo.run.get("general", "verify")
      uhg.data.verify = verified
      verified = verified.filter(n => n._id == id)
      if (verified.length && verified[0].nickname.toLowerCase() == nickname.toLowerCase()) return interaction.editReply({ content: `Už ${user ? 'je':'jsi'} verifikovaný` })

      let post = await uhg.mongo.run.post("general", "verify", { _id: id, uuid: api.uuid, nickname: api.username })
      if (!post.acknowledged) return interaction.editReply({ content: 'Někde nastala chyba!' })

      if (!user && !verified.length && post.insertedId==id) await interaction.editReply({ content: `Úspěšná verifikace jako \`${api.username}\`!` });
      else if (user) await interaction.editReply({ content: `Úspěšně jsi verifikoval ${user||`<@${id}>`} na \`${api.username}\`!` });
      else await interaction.editReply({ content: `Změnil sis jméno z \`${(member.nickname||member.user.username)}\` na \`${api.username}\`!` });

      uhg.mongo.run.post("stats", "stats", api.hypixel)

      let split_guild = uhg.dc.cache.splits.get('guild')
      if (member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && !member._roles.includes(split_guild.id)) await member.roles.add(split_guild.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && member._roles.includes(split_guild.id)) await member.roles.remove(split_guild.role)

      let split_discord = uhg.dc.cache.splits.get('discord')
      if (member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && !member._roles.includes(split_discord.id)) await member.roles.add(split_discord.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && member._roles.includes(split_discord.id)) await member.roles.remove(split_discord.role)

      let split_badges = uhg.dc.cache.splits.get('badges')
      if (member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && !member._roles.includes(split_badges.id)) await member.roles.add(split_badges.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && member._roles.includes(split_badges.id)) await member.roles.remove(split_badges.role)

      let split_badges_sb = uhg.dc.cache.splits.get('badges_sb')
      if (member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && !member._roles.includes(split_badges_sb.id)) await member.roles.add(split_badges_sb.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && member._roles.includes(split_badges_sb.id)) await member.roles.remove(split_badges_sb.role)
      //console.log(member)

      let embed = new MessageEmbed().setTitle(`**Profil hráče ${api.hypixel.username}**`).setURL(`https://plancke.io/hypixel/player/stats/${api.hypixel.username}`)
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v cmd verify příkazu!"
    }
  }
}
