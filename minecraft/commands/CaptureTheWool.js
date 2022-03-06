const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "CaptureTheWool",
  aliases: ["capturethewool", "ctw"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let ctw = api.hypixel.stats.arcade.capturethewool
      let message = `**CTW**: **${api.username}** - ${ctw.killsassists}Kills+Assists ${ctw.capturedwools} Captured Wools`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v CaptureTheWool příkazu!"
    }
  }
}
