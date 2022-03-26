module.exports = {
  name: "verify",
  aliases: ["v"],
  allowedids: [],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      if (!content) return "Nezadal jsi jméno"
      let user = message.author
      let args = content.split(" ")
      if (!args.length) return "Nezadal jsi jméno"

      let verified = await uhg.mongo.get("general", "verify", {_id:message.author.id})
      console.log(verified)

      let nickname = args[0]

      let msg = await message.channel.send("Začíná verifikace!");

      let api = await uhg.func.getApi(nickname, ["key", "hypixel", "mojang", "guild"])
      if (api instanceof Object == false) return await msg.edit({content:api})

      let member = message.guild.members.cache.get(message.author.id)
      let dcusername = api.username


      console.log(member)
      msg.edit("Coming soon")
      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba ve verify příkazu!"
    }
  }
}
