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

      let roles = uhg.dc.cache.badges
      let gmembers = guild.members.cache
      for (let sort in uhg.dc.cache.bRole) {
        if (sort.endsWith('_ids')) continue;
        uhg.dc.cache.bRole[sort].sort((a, b) => a.from - b.from)
      }

      let whitelist = ['DavidCzPdy', 'Honzu']
      for (let user of verify) {
        if (!whitelist.includes(user.nickname)) continue;
        let gmember = gmembers.get(user._id)
        if (!gmember) continue;

        let data = members.filter(n => n.username == user.nickname)
        if (!data.length) continue;
        for (let stat in uhg.dc.cache.bRole) {
          if (stat.endsWith('_ids')) continue;


          let upRole = [];
          if (stat == 'SkyWars' || stat == 'Bedwars') {
            let staty = data[0].stats[stat.toLowerCase()]
            upRole = uhg.dc.cache.bRole[stat].filter(n => {
              if (!n.to && staty.level >= n.from) return true
              else if (n.to && staty.level >= n.from && n.to >= staty.level) return true
              else return false
            })
          } else if (stat == 'Duels' || stat == 'Arena' || stat == 'Walls' || stat == 'VampireZ') {
            let staty = data[0].stats[stat.toLowerCase()]
            let wins = staty.wins
            if (wins === undefined) wins = staty.overall.wins || 0
            upRole = uhg.dc.cache.bRole[stat].filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })
          } else if (stat == 'Quake' || stat == 'Paintball') {
            let staty = data[0].stats[stat.toLowerCase()]
            let kills = staty.kills
            if (kills === undefined) kills = staty.overall.kills || 0
            upRole = uhg.dc.cache.bRole[stat].filter(n => {
              if (!n.to && kills >= n.from) return true
              else if (n.to && kills >= n.from && n.to >= kills) return true
              else return false
            })
          } else if (stat == 'Blitz') {
            let wins = data[0].stats.wins.minigames.blitz || 0
            upRole = uhg.dc.cache.bRole.Blitz.filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })
          } else if (stat == 'TKR') {
            let wins = data[0].stats.tkr.gold || 0
            upRole = uhg.dc.cache.bRole.TKR.filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })
          }
            if (!upRole.length) {
            for (let id of gmember._roles) {
              if (!uhg.dc.cache.bRole[stat+'_ids'].includes(id)) continue;
              await gmember.roles.remove(guild.roles.cache.get(id))
            }
            continue;
          }

          if (!gmember._roles.includes(upRole[0].id)) await gmember.roles.add(upRole[0].role)
          let remove = gmember._roles.filter(n => uhg.dc.cache.bRole[stat+'_ids'].includes(n) && n != upRole[0].id)
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
