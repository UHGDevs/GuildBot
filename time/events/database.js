module.exports = {
  name: "database",
  description: "Automatická aktualizace databáze",
  time: '*/60 * * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    console.log("WORKUJE")
    let now = Number(new Date())
    try {
      console.log(uhg.mongo.get)
      let data = await uhg.mongo.get("stats", "stats")
      console.log("data")

      data = data.filter(n => n.updated<=now-n.delay || n.updated<=now-43000000)
      let update = data.slice(0,50)

      update.forEach(async (member) => {
        console.log(member.name)
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
      //await uhg.func.delay(5000)
      console.log("hotovo")
      //uhg.time.ready.database = true
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
