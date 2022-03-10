module.exports = {
  name: "AP",
  aliases: ["ap", "aps", "achievements", "achievement", "achievementpoints", "achievementpoint"],
  run: async (uhg, pmsg) => {
    try{
      let api = await uhg.func.getApi(pmsg.nickname)
      if (api instanceof Object == false) return api
      let ap = api.hypixel
      let message = `**${api.username}** - ${uhg.func.f(ap.aps)} Achievement Points`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v AP příkazu!"
    }
  }
}
