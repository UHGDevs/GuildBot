module.exports = {
  name: "badges",
  description: "Automatická aktualizace hypixel badges",
  time: '0 */7 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: true,
  run: async (uhg) => {
    let date = new Date()
    try {
      let members = await uhg.mongo.run.get("stats", "stats")
      uhg.data.stats = members

      let minigames = ['SkyWars']
      let role = uhg.dc.client.guilds.cache.get('455751845319802880').roles.cache.filter(n => uhg.startsWithArray(n.name, minigames) || uhg.endsWithArray(n.name, minigames) )
      
      console.log(role.size)



      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování badges na UHG dc!"
    }
  }
}
