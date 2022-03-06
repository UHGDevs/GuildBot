const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Help",
  aliases: ["help"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let message = `[!help] | Ahoj, já jsem UHG Guild BOT, všechny dostupné příkazy najdeš v !commands`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Help příkazu!"
    }
  }
}
