const Sniper = require("../../classes/sniper")
module.exports = {
  name: "sniper",
  aliases: [],
  description: "UHG, the snipers",
  allowedids: ["378928808989949964"],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      if (!content || !content.length) return `${uhg.settings.prefix}sniper [nick] [notify]`
      let args = content.split(" ")

      let notify = false
      if (args[1]) {
        notify = await uhg.func.getApi(args[1], ["mojang", "online"])
        if (notify instanceof Object == false) return notify
        if (!notify.online.online) return "Hráč, kam má být zaslán výsledek není online (or api off)"
        notify = notify.username
      }
      if (notify && !uhg.mc.client) return `Bot zrovna není zaplý na minicraft`

      console.log(notify)

      let api = await uhg.func.getApi(args[0], ["mojang", "online", "recent"])
      if (api instanceof Object == false) return api
      if (!api.online.online) return "Hráč není online (or api off)"
      if (!api.recent.games.length) return "Hráč má vyplé recent games api, nebo ještě nehrál žádnou hru"

      console.log(api.username)

      let sniper = new Sniper(uhg, api, notify)

      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v rozhodně random příkazu!"
    }
  }
}
