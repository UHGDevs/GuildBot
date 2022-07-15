module.exports = {
  name: "bwroles",
  description: "Automatická aktualizace rolí na bedwars serveru",
  time: '0 */10 * * * *', //'*/10 * * * * *'
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

      let whitelist = ['DavidCzPdy']
      for (let user of verify) {
        ///if (!whitelist.includes(user.nickname)) continue;
        let gmember = gmembers.get(user._id)
        if (!gmember) continue;
        let data = members.filter(n => n.uuid == user.uuid)
        if (!data.length) continue;
        let upRole = [];
        for (let stat in uhg.dc.cache.bw.roles) {
          let staty = data[0].stats[stat.toLowerCase()]
          let level = Math.floor(staty.level)
          let up = uhg.dc.cache.bw.roles[stat].filter(n => {
            if (!n.to && level >= n.from) return true
            else if (n.to && level >= n.from && n.to >= level) return true
            else return false
          })[0]
          if (up) upRole.push(up)
          
        }
        console.log(upRole)
return
        let remove = gmember._roles.filter(n => uhg.dc.cache.bw.ids.includes(n) && !upRole.filter(i => i.id == n).length)
        let add = upRole.filter(n => !gmember._roles.includes(n.id))

        for (let r_id of remove) {
          await gmember.roles.remove(guild.roles.cache.get(r_id))
          await uhg.delay(1000)
        }
        for (let aRole of add) {
          await gmember.roles.add(aRole.role)
          await uhg.delay(1000)
        }

      }

      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování rolí na BW dc!"
    }
  }
}
