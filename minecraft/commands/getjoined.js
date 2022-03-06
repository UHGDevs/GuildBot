const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "GetJoined",
  aliases: ["getjoined", "getjoincz"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let level = Math.floor(api.hypixel.level) || 0
      let message = `[${level}] ${pmsg.nickname} se chce připojit do guildy!\n https://plancke.io/hypixel/player/stats/${pmsg.nickname}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v GetJoined příkazu!"
    }
  }
}
