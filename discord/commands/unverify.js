module.exports = {
  name: "unverify",
  aliases: [],
  allowedids: [],
  platform: "dc",
  coolown: 5,
  run: async (uhg, message, content) => {
    try {
      let id = message.author.id
      let unverify = await uhg.mongo.run.delete("general", "verify", {_id:id})

      if (unverify.deletedCount) message.channel.send(`Už nejsi verifikovaný!`)
      else if (unverify.deletedCount==0) return `Nejsi verifikovaný!`
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
