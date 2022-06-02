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

      let gmembers = guild.members.cache
      for (let sort in uhg.dc.cache.bRoles) {
        if (sort.endsWith('_ids')) continue;
        uhg.dc.cache.bRoles[sort].sort((a, b) => a.from - b.from)
      }

      let whitelist = ['DavidCzPdy']
      for (let user of verify) {
        if (!whitelist.includes(user.nickname)) continue;
        let gmember = gmembers.get(user._id)
        if (!gmember) continue;

        let data = members.filter(n => n.uuid == user.uuid)
        if (!data.length) continue;
        let upRole = [];
        for (let stat in uhg.dc.cache.bRoles) {
          if (stat.endsWith('_ids')) continue;

          if (stat == 'SkyWars' || stat == 'Bedwars') {
            let staty = data[0].stats[stat.toLowerCase()]
            let up = uhg.dc.cache.bRoles[stat].filter(n => {
              if (!n.to && staty.level >= n.from) return true
              else if (n.to && staty.level >= n.from && n.to >= staty.level) return true
              else return false
            })[0]
            if (up) upRole.push(up)
          } else if (stat == 'Duels' || stat == 'Arena' || stat == 'Walls' || stat == 'VampireZ') {
            let staty = data[0].stats[stat.toLowerCase()]
            let wins = staty.wins
            if (wins === undefined) wins = staty.overall.wins || 0
            let up = uhg.dc.cache.bRoles[stat].filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })[0]
            if (up) upRole.push(up)
          } else if (stat == 'Quake' || stat == 'Paintball') {
            let staty = data[0].stats[stat.toLowerCase()]
            let kills = staty.kills
            if (kills === undefined) kills = staty.overall.kills || 0
            let up = uhg.dc.cache.bRoles[stat].filter(n => {
              if (!n.to && kills >= n.from) return true
              else if (n.to && kills >= n.from && n.to >= kills) return true
              else return false
            })[0]
            if (up) upRole.push(up)
          } else if (stat == 'Blitz') {
            let wins = data[0].stats.wins.minigames.blitz || 0
            let up = uhg.dc.cache.bRoles[stat].filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })[0]
            if (up) upRole.push(up)
          } else if (stat == 'TKR') {
            let wins = data[0].stats.tkr.gold || 0
            let up = uhg.dc.cache.bRoles[stat].filter(n => {
              if (!n.to && wins >= n.from) return true
              else if (n.to && wins >= n.from && n.to >= wins) return true
              else return false
            })[0]
            if (up) upRole.push(up)
          } else if (stat == 'bb') {
            let title = data[0].stats.bb.title || "DAviD"
            let up = uhg.dc.cache.bRoles.bb.filter(n => n.name.endsWith(title))[0]
            if (up) upRole.push(up)
          } else if (stat == 'CaC') {
            let color = data[0].stats.cac.color || "dAvID"
            let up = uhg.dc.cache.bRoles[stat].filter(n => n.name.endsWith(color + " Rank"))[0]
            if (up) upRole.push(up)
          } else if (stat == 'UHC') {
            let level = data[0].stats.uhc.level || 1
            let up = uhg.dc.cache.bRoles[stat].filter(n => n.name.includes(`[${level}✫]`))[0]
            if (up) upRole.push(up)
          }
        }

        let remove = gmember._roles.filter(n => uhg.dc.cache.split.badges.includes(n) && !upRole.filter(i => i.id == n).length)
        let add = upRole.filter(n => !gmember._roles.includes(n.id))

        for (let r_id of remove) {
          await gmember.roles.remove(guild.roles.cache.get(r_id))
          await uhg.delay(1000)
        }
        for (let aRole of add) {
          await gmember.roles.add(aRole.role)
          await uhg.delay(1000)
        }

        let split_guild = uhg.dc.cache.splits.get('guild')
        if (gmember._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && !gmember._roles.includes(split_guild.id)) await gmember.roles.add(split_guild.role)
        else if (!gmember._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && gmember._roles.includes(split_guild.id)) await gmember.roles.remove(split_guild.role)

        let split_discord = uhg.dc.cache.splits.get('discord')
        if (gmember._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && !gmember._roles.includes(split_discord.id)) await gmember.roles.add(split_discord.role)
        else if (!gmember._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && gmember._roles.includes(split_discord.id)) await gmember.roles.remove(split_discord.role)

        let split_badges = uhg.dc.cache.splits.get('badges')
        if (gmember._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && !gmember._roles.includes(split_badges.id)) await gmember.roles.add(split_badges.role)
        else if (!gmember._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && gmember._roles.includes(split_badges.id)) await gmember.roles.remove(split_badges.role)

        let split_badges_sb = uhg.dc.cache.splits.get('badges_sb')
        if (gmember._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && !gmember._roles.includes(split_badges_sb.id)) await gmember.roles.add(split_badges_sb.role)
        else if (!gmember._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && gmember._roles.includes(split_badges_sb.id)) await gmember.roles.remove(split_badges_sb.role)


      }

      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování badges na UHG dc!"
    }
  }
}
