const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "NickHistory",
  aliases: ["nickhistory", "namehistory", "history", "names", "nicks"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let nicks = api.hypixel
      let message = `**${api.username}** - ${nicks.nicks.join(", ")}`
      if (message.length > 256) message = "Pro jistotu ty nicky nenapíšu, abych se nepřehřál, těch nicků jich je moc na mě"
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v NickHistory příkazu!"
    }
  }
}
