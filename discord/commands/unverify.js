module.exports = {
  name: "unverify",
  aliases: [],
  allowedids: [],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      let auth = ["312861502073995265", "427198829935460353", "379640544143343618", "378928808989949964"]
      let args = content.split(" ").filter(n => n)
      let id = message.author.id;
      let user;
      let custom = false;
      let nickname = args[0] ? args[0] || null : null;

      if (!message.mentions.users.first() && nickname) {
        let api = await uhg.getApi(nickname, ["key", "hypixel", "mojang", "guild"])
        if (api instanceof Object == false) return api
        user = api.hypixel.links.DISCORD || null
        if (!user) return "Hráč nemá propojený Discord s Hypixelem"
        user = uhg.dc.client.users.cache.find(u => u.tag === user)
        if (!user) return "Hráč nemá propojený Discord s Hypixelem"
        id = user.id 
        custom = true
      }
      else if ((message.mentions.members.first() || Number(args[0]) && args[0].length >= 17 ) && auth.includes(id)) {
        nickname = args[1]
        user = message.mentions.users.first() || {}
        user = message.guild.members.cache.get(user.id || args[0])
        id = user.id
        custom = true
      }

      let unverify = await uhg.mongo.run.delete("general", "verify", {_id:id})

      if (unverify.deletedCount && custom == false) message.channel.send(`Už nejsi verifikovaný!`)
      else if (unverify.deletedCount && custom == true) message.channel.send(`${user} již není verifikovaný`)
      else if (unverify.deletedCount==0 && custom == false) return `Nejsi verifikovaný!`
      else if (unverify.deletedCount==0 && custom == true) return `${user} není verifikovaný`
      else return "Někde nastala chyba!"

      if (message.guild.id === "455751845319802880") {
        let member = message.guild.members.cache.get(id)
        let cache = uhg.dc.cache.uhgroles

        try { await member.setNickname(null) } catch (e) {message.reply("Nemám práva na změnu nickname")}

        for (let role of cache) {
          role = role[1]
          if (member._roles.includes(role.id)) {try { await member.roles.remove(role.role) } catch (e) {console.log(e)}}
        }
      }


    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v unverify příkazu!"
    }
  }
}
