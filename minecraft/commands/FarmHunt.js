module.exports = {
  name: "FarmHunt",
  aliases: ["farmhunt", "farm", "fh"],
  run: async (uhg, pmsg) => {
    try{
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname)
      if (api instanceof Object == false) return api
      let farm = api.hypixel.stats.arcade.farmhunt
      let message = `**FarmHunt**: **${api.username}** - ${uhg.func.f(farm.wins)}Wins (${uhg.func.f(farm.animalwins)}A ${uhg.func.f(farm.hunterwins)}H) | ${uhg.func.f(farm.kills)}Kills (${uhg.func.f(farm.animalkills)}A ${uhg.func.f(farm.hunterkills)}H)`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v FarmHunt příkazu!"
    }
  }
}
