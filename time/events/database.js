module.exports = {
  name: "database",
  description: "Automatická aktualizace databáze",
  time: '*/10 * * * * *', // '*/10 * * * * *' or 10000 <-- maybe?
  run: async (uhg) => {
    let now = Number(new Date())
    try {
      let data = await uhg.mongo.get("stats", "stats")

      data = data.filter(n => n.updated<=now-2*3600000)
      let update = data.slice(0,50)

      update.forEach(async (member) => {
        let api = await uhg.func.getApi(member.uuid, ["hypixel"])
        if (api instanceof Object == false) return;
        let staty = {
              _id: api.uuid,
              updated: now,
              username: api.username,
              uuid: api.uuid,
              stats: api.hypixel.stats,
              nicks: api.hypixel.nicks,
              aps: api.hypixel.aps,
              level: api.hypixel.level,
              karma: api.hypixel.karma,
              rank: api.hypixel.rank
        }
        await uhg.mongo.update("stats", "stats", {_id: api.uuid}, staty)
      });
      await uhg.func.delay(5000)
      //uhg.time.database.refresh = now
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
