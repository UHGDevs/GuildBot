const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "FarmHunt",
  aliases: ["farmhunt", "farm", "fh"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let farm = api.hypixel.stats.arcade.farmhunt
      let message = `**FarmHunt**: **${api.username}** - ${farm.wins}Wins (${farm.animalwins}A ${farm.hunterwins}H) | ${farm.kills}Kills (${farm.animalkills}A ${farm.hunterkills}H)`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v FarmHunt příkazu!"
    }
  }
}
