module.exports = {
  name: "MiniWalls",
  aliases: ["miniwalls", "miniw"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let miniwalls = api.hypixel.stats.arcade.miniwalls
      let message = `**MiniWalls**: **${api.username}** - ${uhg.func.f(miniwalls.wins)}Wins ${uhg.func.f(miniwalls.kills)}Kills (Withers: ${uhg.func.f(miniwalls.witherkills)}Kills ${uhg.func.f(miniwalls.witherdmg)} Dmg) Kit: ${miniwalls.kit}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v MiniWalls příkazu!"
    }
  }
}
