const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Blockingdead",
  aliases: ["blockingdead", "bd"],
  run: async (pmsg, client=null) => {
    try {
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let blockingdead = api.hypixel.stats.arcade.blockingdead
      let message = `**BlockingDead**: **${api.username}** - ${blockingdead.wins}Wins ${blockingdead.kills}Kills ${blockingdead.headshots}Headshots`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Blockingdead příkazu!"
    }
  }
}
