const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "HITW",
  aliases: ["hitw", "holeinthewall"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let hitw = api.hypixel.stats.arcade.holeinthewall
      let message = `**HITW**: **${api.username}** - ${hitw.wins}Wins ${hitw.rounds} Rounds ${hitw.qscore} Qualification Score ${hitw.fscore} Final Score`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v HITW příkazu!"
    }
  }
}
