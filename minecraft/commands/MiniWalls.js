const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "MiniWalls",
  aliases: ["miniwalls", "miniw"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let miniwalls = api.hypixel.stats.arcade.miniwalls
      let message = `**MiniWalls**: **${api.username}** - ${miniwalls.wins}Wins ${miniwalls.kills}Kills (Withers: ${miniwalls.witherkills}Kills ${miniwalls.witherdmg} Dmg) Kit: ${miniwalls.kit}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v MiniWalls příkazu!"
    }
  }
}
