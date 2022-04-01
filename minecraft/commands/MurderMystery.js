module.exports = {
  name: "MurderMystery",
  aliases: ["mm", "murder", "murdermystery"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let murder = api.hypixel.stats.murder
      let overall = murder.overall
      let nickname = `**${api.username}**`
      let message = `**MurderMystery**: ${nickname} - ${uhg.uhg.f(overall.wins)}Wins (M: ${uhg.f(murder.murdererwins)} D: ${uhg.f(murder.detectivewins)} H: ${uhg.f(murder.herowins)}) ${f(overall.kills)}Kills`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v MurderMystery příkazu!"
    }
  }
}
