const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "TKR",
  aliases: ["tkr", "turbokartracers"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let tkr = api.hypixel.stats.tkr
      let message = `**TKR**: [${tkr.gold}✪] **${api.username}** - ${tkr.wins}Wins (Trophies: Gold - ${tkr.gold}, Silver - ${tkr.silver}, Bronze - ${tkr.bronze})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v TKR příkazu!"
    }
  }
}
