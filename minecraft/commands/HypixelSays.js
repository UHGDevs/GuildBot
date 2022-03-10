module.exports = {
  name: "HypixelSays",
  aliases: ["hypixelsays", "simonsays", "santasays", "simon"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let simon = api.hypixel.stats.arcade.hypixelsays.overall
      let message = `**HypixelSays**: **${api.username}** - ${uhg.func.f(simon.wins)}Wins ${uhg.func.f(simon.totalpoints)} Points`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v HypixelSays příkazu!"
    }
  }
}
