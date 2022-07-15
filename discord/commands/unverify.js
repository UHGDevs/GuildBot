module.exports = {
  name: "unverify",
  aliases: [],
  allowedids: [],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      let auth = ["312861502073995265", "427198829935460353", "379640544143343618", "378928808989949964"]
      if (!uhg.data.verify) uhg.data.verify = await uhg.mongo.run.get("general", "verify")
      let args = content.split(" ").filter(n => n)
      let id = message.author.id;
      let user;
      let custom = false;

      if (args.length && auth.includes(id)) {
        let unver = uhg.data.verify.filter(n => n.nickname.toLowerCase() == args[0].toLowerCase() || n.uuid.toLowerCase() == args[0].toLowerCase() || n._id == args[0])
        if (!unver.length && !message.mentions.users.first()) return `\`${args[0]}\` není verifikovaný`
        user = message.mentions.users.first() || uhg.dc.client.users.cache.get(unver[0]._id)
        id = user.id 
        custom = true
      }

      let unverify = await uhg.mongo.run.delete("general", "verify", {_id:id})

      if (unverify.deletedCount && custom == false) message.channel.send(`Už nejsi verifikovaný!`)
      else if (unverify.deletedCount && custom == true) message.channel.send(`${user} již není verifikovaný`)
      else if (unverify.deletedCount==0 &&  custom == false) return `Nejsi verifikovaný!`
      else if (unverify.deletedCount==0 && custom == true) return `${user} není verifikovaný`
      else return "Někde nastala chyba!"

      let guild = uhg.dc.client.guilds.cache.get('455751845319802880')
      if (guild.members.cache.has(id)) {
        let member = guild.members.cache.get(id)
        try { await member.setNickname(null) } catch (e) { if (message.guild.name == guild.name) message.reply("Nemám práva na změnu nickname")}

        for (let role of uhg.dc.cache.uhgroles) {
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
