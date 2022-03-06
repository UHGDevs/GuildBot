const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "BountyHunters",
  aliases: ["bountyhunters", "bounty", "bh"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let bh = api.hypixel.stats.arcade.bountyhunters
      let message = `**BountyHunters**: **${api.username}** - ${f(bh.wins)}Wins ${f(bh.kills)}Kills ${bh.kdr}KDR ${f(bh.bountykills)} Bounty Kills`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BountyHunters příkazu!"
    }
  }
}
