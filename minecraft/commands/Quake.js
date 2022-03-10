module.exports = {
  name: "Quake",
  aliases: ["quakecraft", "quake", "qc"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let quake = api.hypixel.stats.quake
      let message = `**Quake**: [${uhg.func.r(quake.kills)}] **${api.username}** - ${uhg.func.f(quake.wins)}Wins ${quake.kdr}KDR`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Quake příkazu!"
    }
  }
}
