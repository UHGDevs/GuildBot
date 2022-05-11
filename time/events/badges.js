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
      let verify = await uhg.mongo.run.get('general', 'verify')
      uhg.data.verify = verify
      uhg.data.stats = members

      let guild = uhg.dc.client.guilds.cache.get('455751845319802880')

      verify = verify.filter(n => guild.members.cache.get(n._id))

      let minigames = ['SkyWars', 'Bedwars']
      let roles = guild.roles.cache.filter(n => uhg.startsWithArray(n.name, minigames) || uhg.endsWithArray(n.name, minigames) )
      let gmembers = guild.members.cache

      let vRoles = {}

      for (let role of roles) {
        role = role[1]
        //console.log(role.name)
        let roztec = role.name.split('-')
        let r = {
          id: role.id,
          name: role.name,
          stat: role.name.replace(/[^a-z]+/gi, ""),
          from: Number(roztec[0].replace(/[^\d.]/g, '')) || 0,
          to: Number((roztec[1]||'').replace(/[^\d.]/g, '')) || null,
          role: role
        }

        if (!vRoles[r.stat]) vRoles[r.stat] = []
        if (!vRoles[r.stat+"_ids"]) vRoles[r.stat+'_ids'] = []

        vRoles[r.stat].push(r)
        vRoles[r.stat+'_ids'].push(r.id)
      }

      for (let sort in vRoles) {
        if (sort.endsWith('_ids')) continue;
        vRoles[sort].sort((a, b) => a.from - b.from)
      }


      for (let user of verify) {
        if (user.nickname != 'DavidCzPdy') continue
        let gmember = gmembers.get(user._id)
        if (!gmember) continue;

        let data = members.filter(n => n.username == user.nickname)
        for (let stat in vRoles) {
          if (stat.endsWith('_ids')) continue;

          let upRole = [];
          if (stat == 'SkyWars' || stat == 'Bedwars') {
            let staty = data[0].stats[stat.toLowerCase()]
            upRole = vRoles[stat].filter(n => {
              if (!n.to && staty.level >= n.from) return true
              else if (n.to && staty.level >= n.from && n.to > staty.level) return true
              else return false
            })
          }

          if (!upRole.length) continue;
          if (!gmember._roles.includes(upRole[0].id)) await gmember.roles.add(upRole[0].role)
          let remove = gmember._roles.filter(n => vRoles[stat+'_ids'].includes(n) && n != upRole[0].id)
          for (let id of remove) { await gmember.roles.remove(guild.roles.cache.get(id)) }
        }
      }

      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování badges na UHG dc!"
    }
  }
}
