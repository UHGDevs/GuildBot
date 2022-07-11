module.exports = {
    name: "SummerEvent",
    aliases: ["summer", "summerevent", "event"],
    run: async (uhg, pmsg) => {
      try{
        let api = await uhg.getApi(pmsg.nickname)
        if (api instanceof Object == false) return api
        let message = `**SummerEvent**: **${api.username}** - Level ${uhg.f(api.hypixel.seasonal.summer.level)}, ${uhg.f(api.hypixel.seasonal.summer.xpleft)} XP do dalšího Levelu, ${uhg.f(api.hypixel.seasonal.silver)} Silver`
        return message
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v SummerEvent příkazu!"
      }
    }
  }
  