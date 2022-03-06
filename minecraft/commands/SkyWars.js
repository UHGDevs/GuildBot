const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "SkyWars",
  aliases: ["sw", "skywars"],
  run: async (pmsg, client=null) => {
    try{
      //console.log("test")
      let nickname = pmsg.nickname
      //console.log("test1")
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      //console.log("test2")
      let skywars = api.hypixel.stats.skywars
      let overall = skywars.overall
      //console.log("test3")
      let message = `**SkyWars**: [${skywars.levelformatted}] **${api.username}** - ${f(overall.kills)}Kills ${f(overall.wins)}Wins ${f(overall.kdr)}KDR ${f(overall.wlr)}WLR ${Math.floor(skywars.playtime)}h`
      //console.log("test4")
      return message
      //console.log("test5")
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v SkyWars příkazu!"
    }
  }
}
