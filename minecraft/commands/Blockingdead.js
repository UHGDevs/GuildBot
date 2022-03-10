module.exports = {
  name: "Blockingdead",
  aliases: ["blockingdead", "bd"],
  run: async (uhg, pmsg) => {
    try {
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname)
      if (api instanceof Object == false) return api
      let blockingdead = api.hypixel.stats.arcade.blockingdead
      let message = `**BlockingDead**: **${api.username}** - ${uhg.func.f(blockingdead.wins)}Wins ${uhg.func.f(blockingdead.kills)}Kills ${uhg.func.f(blockingdead.headshots)}Headshots`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Blockingdead příkazu!"
    }
  }
}
