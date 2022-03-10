module.exports = {
  name: "PartyGames",
  aliases: ["partygames", "pg"],
  run: async (uhg, pmsg) => {
    try{
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname)
      if (api instanceof Object == false) return api
      let pg = api.hypixel.stats.arcade.partygames
      let message = `**PartyGames**: **${api.username}** - ${uhg.func.f(pg.wins)}Wins ${uhg.func.f(pg.stars)}☆ ${uhg.func.f(pg.rounds)} Rounds`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v PartyGames příkazu!"
    }
  }
}
