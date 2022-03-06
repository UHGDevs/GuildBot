const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Pit",
  aliases: ["thepit", "pit", "hypixelpit"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let pit = api.hypixel.stats.pit
      let message = `**Pit**: [${pit.prestigeroman}-${pit.level}] **${api.username}** - Playtime: ${f(pit.playtime)} - ${pit.gold}g - ${f(pit.renown)} Renown`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Pit příkazu!"
    }
  }
}
