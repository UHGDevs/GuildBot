const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Zombies",
  aliases: ["zombies"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let zombies = api.hypixel.stats.arcade.zombies
      let bestround = zombies.bestround
      console.log(bestround)
      let numend = "th"
      let dontbeerrorplease = `${bestround}`
      if (dontbeerrorplease.endsWith(1) == true) numend = "st"
      else if (dontbeerrorplease.endsWith(2) == true) numend = "nd"
      else if (dontbeerrorplease.endsWith(3) == true) numend = "rd"
      let message = `**Zombies**: **${api.username}** - ${zombies.wins}Wins ${zombies.kills}Kills ${zombies.kdr}KDR ${zombies.misshitratio} Miss/HitRatio | Best: ${zombies.bestround + numend} Wave`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Zombies příkazu!"
    }
  }
}
