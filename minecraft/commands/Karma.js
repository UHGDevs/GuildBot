const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Karma",
  aliases: ["karma"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let karma = api.hypixel
      let message = `**${api.username}** - ${f(karma.karma)} Karma`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Karma příkazu!"
    }
  }
}
