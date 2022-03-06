const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "HypixelSays",
  aliases: ["hypixelsays", "simonsays", "santasays", "simon"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let simon = api.hypixel.stats.arcade.hypixelsays.overall
      let message = `**HypixelSays**: **${api.username}** - ${simon.wins}Wins ${simon.totalpoints} Points`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v HypixelSays příkazu!"
    }
  }
}
