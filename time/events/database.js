module.exports = {
  name: "database",
  description: "Automatická aktualizace databáze",
  time: '*/300 * * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    let now = Number(new Date())
    try {
      let data = await uhg.mongo.run.get("stats", "stats")
      //console.log(data)
      data = data.filter(n => n.updated<=now-43000000) //n.updated<=now-n.delay ||
      let update = data.slice(0,50)
      console.log(update.length)
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
        await uhg.mongo.run.update("stats", "stats", {_id: api.uuid}, staty)
      });
      //await uhg.func.delay(5000)
      //uhg.time.ready.database = true
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
