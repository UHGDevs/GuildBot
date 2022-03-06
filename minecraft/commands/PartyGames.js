const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "PartyGames",
  aliases: ["partygames", "pg"],
  run: async (pmsg, client=null) => {
    try{
      let nickname = pmsg.nickname
      let api = await getApi(nickname)
      if (api instanceof Object == false) return api
      let pg = api.hypixel.stats.arcade.partygames
      let message = `**PartyGames**: **${api.username}** - ${pg.wins}Wins ${pg.stars}☆ ${pg.rounds} Rounds`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v PartyGames příkazu!"
    }
  }
}
