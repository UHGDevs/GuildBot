module.exports = {
  name: "BuildBattle",
  aliases: ["bb", "build", "buildbattle"],
  run: async (uhg, pmsg) => {
    const f = uhg.f
    try{
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let bb = api.hypixel.stats.bb
      let message = `**BuildBattle**: ${bb.title} **${api.username}** - ${f(bb.overall.wins)} Wins ${f(bb.score)} Score`
      
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BuildBattle příkazu!"
    }
  }
}
