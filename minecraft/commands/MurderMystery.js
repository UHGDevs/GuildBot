const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "MurderMystery",
  aliases: ["mm", "murder", "murdermystery"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let murder = api.hypixel.stats.murder
      let overall = murder.overall
      let nickname = `**${api.username}**`
      let message = `**MurderMystery**: ${nickname} - ${f(overall.wins)}Wins (M: ${f(murder.murdererwins)} D: ${f(murder.detectivewins)} H: ${f(murder.herowins)}) ${f(overall.kills)}Kills`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v MurderMystery příkazu!"
    }
  }
}
