const { getApi } = require("../../../handlers/api")
const { f, m } = require("../../../handlers/func")
module.exports = {
  name: "Quake",
  aliases: ["quakecraft", "quake", "qc"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let quake = api.hypixel.stats.quake
      let message = `**Quake**: [${m(quake.kills)}] **${api.username}** - ${quake.wins}Wins ${quake.kdr}KDR`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Quake příkazu!"
    }
  }
}
