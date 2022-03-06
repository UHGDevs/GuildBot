const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Football",
  aliases: ["football", "fb", "soccer"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let fb = api.hypixel.stats.arcade.football
      let message = `**Football**: **${api.username}** - ${fb.wins}Wins ${fb.goals} Goals`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Football příkazu!"
    }
  }
}
