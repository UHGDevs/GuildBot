module.exports = {
  name: "Wins",
  aliases: ["wins", "win", "výhry"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname, ["api", "skyblock", "hypixel", "mojang"])
      if (api instanceof Object == false) return api
      let wins = api.hypixel.stats.wins
      //console.log(wins.minigames)
      const maxValue = Object.entries(wins.minigames).reduce((a, b) => a[1] > b[1] ? a : b)[0]
      //console.log(wins)
      let message = `**${api.username}** - ${uhg.func.f(wins.total)} Wins (Most wins - ${uhg.func.f(maxValue)})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Wins příkazu!"
    }
  }
}
