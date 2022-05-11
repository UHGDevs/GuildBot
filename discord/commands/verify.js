module.exports = {
  name: "verify",
  aliases: ["v"],
  allowedids: [],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      if (!content) return "Nezadal jsi jméno"
      let args = content.split(" ")
      if (!args.length) return "Nezadal jsi jméno"

      let id = message.author.id

      auth = ["312861502073995265", "427198829935460353", "378928808989949964", "379640544143343618"]

      let nickname;
      let user; 
      let form = 0;

      if (message.mentions.members.first() && auth.includes(id)) {
        nickname = args[1]
        user = message.mentions.users.first()
        user = message.guild.members.cache.get(user.id)
        form = 1
      }
      else nickname = args[0]

      if (!nickname) return "Nezadal jsi jméno, a nebo jsi blbej a neumíš pořádně oddělovat slova jednou mezerou"

      let api = await uhg.getApi(nickname, ["key", "hypixel", "mojang", "guild"])
      if (api instanceof Object == false) return api

      let member = message.guild.members.cache.get(message.author.id)
      let dcusername = api.username

      if (form == 0 && api.hypixel.links.DISCORD != `${message.author.username}#${message.author.discriminator}`) return "Nemáš discord propojený s hypixelem!"

      if (member.guild.id === '455751845319802880') {
        if (member._roles.includes('572651929625296916')) dcusername = `[Admin] ${api.username}`
        else if (member._roles.includes('478610913386168360')) dcusername = `[Mod] ${api.username}`
        else if (member._roles.includes('456149770847649802')) dcusername = `[YOUTUBE] ${api.username}`
        try { await member.setNickname(dcusername) } catch (e) {}

        if (!member._roles.includes("478816107222925322")) await member.roles.add( message.guild.roles.cache.get("478816107222925322"))

        let cache = uhg.dc.cache.uhgroles
        let rGMember = cache.get("Guild Member")

        if (api.guild.name === "UltimateHypixelGuild" || id == "427198829935460353") {
          let grole = "Guild " + api.guild.member.rank
          console.log(grole)
          if (grole == "Guild Guild Master") grole = "Guild Master"
          if (!member._roles.includes(rGMember.id)) try { await member.roles.add(rGMember.role) } catch (e) {}
          console.log(rGMember)
          console.log(rGMember.id)
          for (let role of cache) {
            if (role[0] == "Guild Member" || role[0] == "🌙Default🌙") continue
            role = role[1]
            if (member._roles.includes(role.id) && role.name!=grole) try { await member.roles.remove(role.role) } catch (e) {}
            else if (!member._roles.includes(role.id) && role.name == grole) {try { await member.roles.add(role.role) } catch (e) {}}
          }
        } else {
          for (let role of cache) {
            if (role[0] == "🌙Default🌙") continue
            role = role[1]
            if (member._roles.includes(role.id)) {try { await member.roles.remove(role.role) } catch (e) {}}
          }
        }
      }


      let verified = await uhg.mongo.run.get("general", "verify", {_id:id})
      if (verified.length && verified[0].nickname.toLowerCase() == args[0].toLowerCase()) return "Už jsi verifikovaný"

      let post = await uhg.mongo.run.post("general", "verify", { _id: id, uuid: api.uuid, nickname: api.username, updated: Number(new Date()) })
      if (!post.acknowledged) return "Někde nastala chyba!"

      let msg;

      if (form == 0 && !verified.length && post.insertedId==id) msg = await message.channel.send(`Úspěšná verifikace jako \`${api.username}\`!`);
      else if (form == 1) msg = await message.channel.send(`Úspěšně jsi verifikoval ${user||id} na \`${api.username}\`!`)
      else msg = await message.channel.send(`Změnil sis jméno z \`${(member.nickname||member.user.username).replace("[Admin] ", "").replace("[Mod] ", "").replace("[YOUTUBE] ", "")}\` na \`${api.username}\`!`);

      uhg.mongo.run.post("stats", "stats", { _id: api.uuid, updated: Number(new Date()), username: api.username, uuid: api.uuid, stats: api.hypixel.stats, nicks: api.hypixel.nicks, aps: api.hypixel.aps, level: api.hypixel.level, karma: api.hypixel.karma, rank: api.hypixel.rank })

      //console.log(member)
      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba ve verify příkazu!"
    }
  }
}
