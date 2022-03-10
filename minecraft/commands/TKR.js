module.exports = {
  name: "TKR",
  aliases: ["tkr", "turbokartracers"],
  run: async (uhg, pmsg) => {
    try{
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname)
      if (api instanceof Object == false) return api
      let tkr = api.hypixel.stats.tkr
      let message = `**TKR**: [${tkr.gold}✪] **${api.username}** - ${tkr.wins}Wins (Trophies: Gold - ${tkr.gold}, Silver - ${tkr.silver}, Bronze - ${tkr.bronze})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v TKR příkazu!"
    }
  }
}
