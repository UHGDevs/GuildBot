module.exports = {
  name: "SkyWars",
  aliases: ["sw", "skywars"],
  run: async (uhg, pmsg) => {
    try{
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let skywars = api.hypixel.stats.skywars
      let overall = skywars.overall
      let message = `**SkyWars**: [${skywars.levelformatted}] **${api.username}** - ${uhg.f(overall.kills)}Kills ${uhg.f(overall.wins)}Wins ${uhg.f(overall.kdr)}KDR ${uhg.f(overall.wlr)}WLR ${Math.floor(skywars.playtime)}h`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v SkyWars příkazu!"
    }
  }
}
