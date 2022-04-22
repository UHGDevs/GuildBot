module.exports = {
  name: "BedWars",
  aliases: ["bw", "bedwars"],
  run: async (uhg, pmsg) => {
    const f = uhg.f
    try{
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let bedwars = api.hypixel.stats.bedwars
      let overall = bedwars.overall
      let message = `**BedWars**: ${bedwars.levelformatted} **${api.username}** - ${f(overall.finalKills)}Finals ${f(overall.wins)}Wins ${f(overall.fkdr)}FKDR ${f(overall.wlr)}WLR (Main gamemode - ${bedwars.main_mode})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BedWars příkazu!"
    }
  }
}
