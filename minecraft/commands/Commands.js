const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Commands",
  aliases: ["commands", "command", "cmd", "cmds", "cmnd", "cmnds"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let message = `Dostupné příkazy: shorturl.at/ipDR8`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v cmd příkazu!"
    }
  }
}
