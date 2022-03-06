const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "CreeperAttack",
  aliases: ["creeperattack", "creeper"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let creeper = api.hypixel.stats.arcade.creeperattack
      let message = `**CreeperAttack**: **${api.username}** - Best Round: ${creeper.bestround}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v CreeperAttack příkazu!"
    }
  }
}
