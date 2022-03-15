module.exports = {
  name: "verify",
  aliases: ["v"],
  run: async (uhg, message, content) => {
    try {
      let args = content.split(" ")
      if (!args.length) return "Nezadal jsi jméno"

      let nickname = args[0]

      let msg = await message.channel.send("Začíná verifikace!");

      
      console.log("content")
      return "comming soon (I hope)"
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba ve verify příkazu!"
    }
  }
}
