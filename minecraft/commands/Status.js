const { getApi } = require("../../../handlers/api")
const { f, getStatus } = require("../../../handlers/func")
module.exports = {
  name: "Status",
  aliases: ["status", "online", "onlinestatus", "o"],
  run: async (pmsg, client=null) => {
    try{
      let { onlinegame, onlinemode, onlinemap } = "haha"
      let api = await getApi(pmsg.nickname, ["online", "mojang"])
      if (api instanceof Object == false) return api
      console.log(api.online.title)
      if (api.online.game) onlinegame = " - " + api.online.game + " "
      if (api.online.mode) onlinemode = api.online.mode + " "
      if (api.online.map) onlinemap = `(${api.online.map})`
      let message = `[${api.online.title||"error"}] **${api.username}**${onlinegame||""}${getStatus(onlinemode)||""}${onlinemap||""}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Status příkazu!"
    }
  }
}