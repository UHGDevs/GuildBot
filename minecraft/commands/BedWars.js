const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "BedWars",
  aliases: ["bw", "bedwars"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let bedwars = api.hypixel.stats.bedwars
      let overall = bedwars.overall
      let message = `**BedWars**: ${bedwars.levelformatted} **${api.username}** - ${f(overall.finalKills)}Finals ${f(overall.wins)}Wins ${f(overall.fkdr)}FKDR`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BedWars příkazu!"
    }
  }
}
