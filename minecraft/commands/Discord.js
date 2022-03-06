const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Discord",
  aliases: ["discord", "social", "socials", "dc"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let socials = api.hypixel
      let msg = socials.links.DISCORD
      if (!socials.links.DISCORD) msg = "Nemá propojený Discord s Hypixelem"
      let message = `**Discord**: **${api.username}** - ${msg}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Discord příkazu!"
    }
  }
}
