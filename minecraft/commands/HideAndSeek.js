const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "HideAndSeek",
  aliases: ["hideandseek", "has", "hns", "hidenseek", "prophunt", "partypopper"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let hns = api.hypixel.stats.arcade.hideandseek
      let overall = hns.overall
      let pp = hns.partypopper
      let ph = hns.prophunt
      message = `**HideAndSeek**: **${api.username}** - ${overall.wins}Wins (Party Pooper: ${pp.hiderwins}H ${pp.seekerwins}S, Prop Hunt: ${ph.hiderwins}H ${ph.seekerwins}S)`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v HideAndSeek příkazu!"
    }
  }
}
