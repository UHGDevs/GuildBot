const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "PixelPainters",
  aliases: ["pixelpainters", "pixel", "painters"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let pp = api.hypixel.stats.arcade.pixelpainters
      let message = `**PixelPainters**: **${api.username}** - ${pp.wins}Wins`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v PixelPainters příkazu!"
    }
  }
}
