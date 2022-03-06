const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Level",
  aliases: ["lvl", "level"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let nwlevel = api.hypixel
      let message = `**${api.username}** - ${f(nwlevel.level)} Hypixel Network Level`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Level příkazu!"
    }
  }
}
