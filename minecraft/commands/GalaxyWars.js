const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "GalaxyWars",
  aliases: ["galaxywars", "galaxy", "gw", "starwars"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let gwars = api.hypixel.stats.arcade.galaxywars
      let message = `**GalaxyWars**: **${api.username}** - ${gwars.wins}Wins ${gwars.kills}Kills ${gwars.kdr}KDR`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v GalaxyWars příkazu!"
    }
  }
}
