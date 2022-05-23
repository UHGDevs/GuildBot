module.exports = {
  name: "CaC",
  aliases: ["cac", "crops", "crims", "cropsandcrims"],
  run: async (uhg, pmsg) => {
    const f = uhg.f
    try{
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let cac = api.hypixel.stats.cac
      let message = `**CaC**: **${api.username}** - ${f(cac.wins)} Wins`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v CaC příkazu!"
    }
  }
}
