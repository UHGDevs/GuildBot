module.exports = {
  name: "WoolWars",
  aliases: ["ww", "wool", "wools", "woolwars"],
  run: async (uhg, pmsg) => {
    const f = uhg.f
    try{
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname)
      if (api instanceof Object == false) return api
      let ww = api.hypixel.stats.ww
      let message = `**WoolWars**: [${Math.floor(ww.lvl.level)}✫] ${api.username} - ${f(ww.wins)}Wins ${f(ww.kills)}Kills ${f(ww.wlr)}WLR ${f(ww.kdr)}KDR (${Math.round(ww.lvl.xpleft)} XP do dalšího levelu) | (Selected Class: ${ww.selected_class})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v WoolWars příkazu!"
    }
  }
}
