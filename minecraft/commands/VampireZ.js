const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "VampireZ",
  aliases: ["vz", "vampirez", "vampire"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let vz = api.hypixel.stats.vampirez
      let message = `**VampireZ**: [${vz.wins}] **${api.username}** - Wins: ${vz.humanwins}H ${vz.vampirewins}V | Kills: ${vz.vampirekills}V ${vz.humankills}H ${vz.zombiekills}Z`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v VampireZ příkazu!"
    }
  }
}
