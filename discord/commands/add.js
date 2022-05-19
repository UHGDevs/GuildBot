module.exports = {
  name: "add",
  aliases: ["a"],
  allowedids: ["312861502073995265", "379640544143343618", "427198829935460353", "378928808989949964"],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      if (!content) return "Nezadal jsi jméno"
      let args = content.split(" ").filter(n => n)
      if (!args.length) return "Nezadal jsi jméno"

      let api = await uhg.getApi(args[0], ["key", "hypixel", "mojang"])
      if (api instanceof Object == false) return api
      uhg.mongo.run.post("stats", "stats", { _id: api.uuid, updated: Number(new Date()), username: api.username, uuid: api.uuid, stats: api.hypixel.stats, nicks: api.hypixel.nicks, aps: api.hypixel.aps, level: api.hypixel.level, karma: api.hypixel.karma, rank: api.hypixel.rank })

      return `${api.username} byl přidán do databáze`
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v add příkazu!"
    }
  }
}
