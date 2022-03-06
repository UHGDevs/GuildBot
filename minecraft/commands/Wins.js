const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Wins",
  aliases: ["wins", "win", "výhry"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname, ["api", "skyblock", "hypixel", "mojang"])
      if (api instanceof Object == false) return api
      let wins = api.hypixel.stats.wins
      console.log(wins.minigames)
      const maxValue = Object.entries(wins.minigames).reduce((a, b) => a[1] > b[1] ? a : b)[0]
      //console.log(wins)
      let message = `**${api.username}** - ${f(wins.total)} Wins (Most wins - ${maxValue})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Wins příkazu!"
    }
  }
}
