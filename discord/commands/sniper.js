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

      if (args[0] == "stop") {uhg.snipe.delete(uhg.snipe.find(f=>f.author==message.author.id).username); return "Zastaveno"}
      if (args[0] == "stopall" && message.author.id == "378928808989949964") {uhg.snipe.forEach(n => {uhg.snipe.delete(n.username)});return "Vše zastaveno"}

      if (uhg.snipe.get(uhg.snipe.find(f=>f.author==message.author.id))) return "Už někoho trackuješ"
      if (uhg.snipe.size>0) return "Už je trackovaný jiný hráč"

      let notify = false
      if (args[1]) {
        notify = await uhg.func.getApi(args[1], ["mojang", "online"])
        if (notify instanceof Object == false) return notify
        if (!notify.online.online) return "Hráč, kam má být zaslán výsledek není online (or api off)"
        notify = notify.username
      }
      if (notify && !uhg.mc.client) return `Bot zrovna není zaplý na minicraft`

      let api = await uhg.func.getApi(args[0], ["mojang", "online", "recent"])
      if (api instanceof Object == false) return api
      if (!api.online.online) return "Hráč není online (or api off)"
      if (!api.recent.games.length) return "Hráč má vyplé recent games api, nebo ještě nehrál žádnou hru"
      if (uhg.snipe.get(api.username)) return "Hráč už je trackovaný"

      let sniper = new Sniper(uhg, api, notify)
      sniper.author = message.author.id

      uhg.snipe.set(api.username, sniper)

      return "Target byl nastaven, be ready now"
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v rozhodně random příkazu!"
    }
  }
}