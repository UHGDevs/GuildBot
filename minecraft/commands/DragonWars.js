const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "DragonWars",
  aliases: ["dragonwars", "dw", "dragons", "dragon"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let dw = api.hypixel.stats.arcade.dragonwars
      let message = `**DragonWars**: **${api.username}** - ${dw.wins}Wins ${dw.kills}Kills`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v DragonWars příkazu!"
    }
  }
}
