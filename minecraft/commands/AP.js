const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "AP",
  aliases: ["ap", "aps", "achievements", "achievement", "achievementpoints", "achievementpoint"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let ap = api.hypixel
      let message = `**${api.username}** - ${f(ap.aps)} Achievement Points`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v AP příkazu!"
    }
  }
}
