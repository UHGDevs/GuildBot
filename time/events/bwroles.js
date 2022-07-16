const refresh = require('../../utils/serverroles.js')

module.exports = {
  name: "bwroles",
  description: "Automatická aktualizace rolí na bedwars serveru",
  time: '0 */7 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: true,
  run: async (uhg) => {
    let date = new Date()
    try {
      let members = await uhg.mongo.run.get("stats", "stats")
      let verify = await uhg.mongo.run.get('general', 'verify')
      uhg.data.verify = verify
      uhg.data.stats = members

      let guild = uhg.dc.client.guilds.cache.get('874337528621191251')

      verify = verify.filter(n => guild.members.cache.get(n._id))

      let gmembers = guild.members.cache
let ids = []
      let whitelist = ['DavidCzPdy']
      for (let user of verify) {
        //if (!whitelist.includes(user.nickname)) continue;
        let gmember = gmembers.get(user._id)
        if (!gmember) continue;
        let data = members.filter(n => n.uuid == user.uuid)
        if (!data.length) continue;
ids.push(user.id)
        
        await refresh.bw_refresh(uhg, gmember, data[0])
      }

let unverified = guild.members.cache.filter(n => !ids.includes(n.id))
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování rolí na BW dc!"
    }
  }
}
