module.exports = {
  name: "BountyHunters",
  aliases: ["bountyhunters", "bounty", "bh"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let bh = api.hypixel.stats.arcade.bountyhunters
      let message = `**BountyHunters**: **${api.username}** - ${uhg.func.f(bh.wins)}Wins ${uhg.func.f(bh.kills)}Kills ${bh.kdr}KDR ${uhg.func.f(bh.bountykills)} Bounty Kills`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BountyHunters příkazu!"
    }
  }
}
