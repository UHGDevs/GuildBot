const { Collection } = require('discord.js');

exports.uhg = async (uhg) => {
  try {
    let guild = uhg.dc.client.guilds.cache.get("455751845319802880")
    uhg.dc.cache.uhgroles = new Collection()

    let vroles = ["478816107222925322", "530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063"]
    vroles.forEach(id => {
      let role = guild.roles.cache.get(id)
      let data = {name: role.name, id: role.id, color: role.color, role: role}
      uhg.dc.cache.uhgroles.set(role.name, data)
    });

    uhg.dc.cache.split = {}
    uhg.dc.cache.split.guild = ["530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063", "656827910807879696", "807226875411431424", "977141028115058718", "916790046823161956"]
    uhg.dc.cache.split.discord = ["684069130478813226", "456149770847649802", "575052804960288770", "478598933908553730", "478816107222925322", "478811145034137611", "478809710997536768", "475588114732023818", "464872228995989515", "464872228996120617", "475594143448694787", "464872228819959819", "489790082585329669", "481101689550536714", "482898838722707466", "936257245178634261", "934449629800587325", "927992007157252136"]
    uhg.dc.cache.split.badges = []
    let minigames = ['SkyWars', 'Bedwars', 'Blitz SG', 'Duels', 'Build Battle', 'CaC', 'Arena Brawl', 'Paintball', 'Quakecraft', 'The Walls', 'TKR', 'VampireZ', 'UHC Champions', 'Speed UHC']
    uhg.dc.cache.badges = guild.roles.cache.filter(n => uhg.startsWithArray(n.name, minigames) || uhg.endsWithArray(n.name, minigames))
    uhg.dc.cache.badges.forEach(n => {uhg.dc.cache.split.badges.push(n.id)});

    let skyblock = ['Skill Avarage', 'Catacombs', 'Slayer Average', 'Networth', 'Weight)']
    uhg.dc.cache.badges_sb = guild.roles.cache.filter(n => uhg.startsWithArray(n.name, skyblock) || uhg.endsWithArray(n.name, skyblock))
    uhg.dc.cache.split.badges_sb = []
    uhg.dc.cache.badges_sb.forEach(n => {uhg.dc.cache.split.badges_sb.push(n.id)});


    uhg.dc.cache.splits = new Collection()

    let guild_split = guild.roles.cache.get('973907328942358558')
    uhg.dc.cache.splits.set('guild', {name: guild_split.name, id: guild_split.id, color: guild_split.color, role: guild_split})

    let discord_split = guild.roles.cache.get('973907442842861620')
    uhg.dc.cache.splits.set('discord', {name: discord_split.name, id: discord_split.id, color: discord_split.color, role: discord_split})

    let badges_split = guild.roles.cache.get('927943516305387590')
    uhg.dc.cache.splits.set('badges', {name: badges_split.name, id: badges_split.id, color: badges_split.color, role: badges_split})

    let badges_sb_split = guild.roles.cache.get('973948440881025034')
    uhg.dc.cache.splits.set('badges_sb', {name: badges_sb_split.name, id: badges_sb_split.id, color: badges_sb_split.color, role: badges_sb_split})

    uhg.dc.cache.bRoles = {}
     for (let role of uhg.dc.cache.badges) {
       role = role[1]
       let roztec = role.name.split('-')
       let r = {
         id: role.id,
         name: role.name,
         stat: role.name.replace(/[^a-z]+/gi, ""),
         from: Number(roztec[0].replace(/[^\d.]/g, '')) || 0,
         to: Number((roztec[1]||'').replace(/[^\d.]/g, '')) || null,
         role: role
       }
       if (r.stat.startsWith('Duels')) r.stat = 'Duels'
       if (r.stat.startsWith('Arena')) r.stat = 'Arena'
       if (r.stat.startsWith('Quake')) r.stat = 'Quake'
       if (r.stat.startsWith('Murder')) r.stat = 'Murder'
       if (r.stat.startsWith('TheWalls')) r.stat = 'Walls'
       if (r.stat.startsWith('Build')) r.stat = 'bb'
       if (r.stat.startsWith('Wool')) r.stat = 'ww'
       if (r.stat.startsWith('Blitz')) r.stat = 'Blitz'
       if (r.stat.startsWith('CaC')) r.stat = 'CaC'
       if (r.stat.startsWith('UHC')) r.stat = 'UHC'
       if (r.stat.startsWith('Speed')) r.stat = 'SpeedUHC'

       if (!uhg.dc.cache.bRoles[r.stat]) uhg.dc.cache.bRoles[r.stat] = []
       if (!uhg.dc.cache.bRoles[r.stat+"_ids"]) uhg.dc.cache.bRoles[r.stat+'_ids'] = []

       uhg.dc.cache.bRoles[r.stat].push(r)
       uhg.dc.cache.bRoles[r.stat+'_ids'].push(r.id)
     }

     for (let sort in uhg.dc.cache.bRoles) {
       if (sort.endsWith('_ids')) continue;
       uhg.dc.cache.bRoles[sort].sort((a, b) => b.from - a.from)
     }
  } catch (e) {
    console.log(e)
  }
}



exports.bw = async (uhg) => {
  try {
    uhg.dc.cache.bw = {roles: [], ids: [], allroles: []}
    let guild = uhg.dc.client.guilds.cache.get('874337528621191251')
    if (!guild) return console.log('Nejsem na bw dc')

    let allroles = ["FKDR", "WLR", "BBLR", "wins", "Final Kills", "Beds Broken", "Prestige"] //"Challenges Completed"
    let pres = ["Stone", "Iron", "Gold", "Diamond", "Emerald", "Sapphire", "Ruby", "Crystal", "Opal", "Amethyst", "Rainbow"]
    let roles = guild.roles.cache.filter(n => uhg.includesWithArray(n.name, allroles))

    uhg.dc.cache.bw.allroles.push(guild.roles.cache.get('877239217795768340'))
    for (let role of roles) {
      role = role[1]
      uhg.dc.cache.bw.allroles.push(role)
      uhg.dc.cache.bw.ids.push(role.id)
      let r = {
        id: role.id,
        name: role.name,
        role: role
      }
      if (r.name.includes('Prestige')){
        r.stat = 'level'
        r.from = pres.indexOf(r.name.split(' ')[0].replace(/[^a-z]+/gi, "")) * 100
      }
      else {
        r.stat = role.name.split('[')[1].replace(/[^a-z]+/gi, "").toLowerCase()
        r.from = Number(role.name.replace(',', '.').replace(/[^\d.]/g, '')) || 0
      }

      if (r.stat == 'finalkills') r.stat = r.stat.replace('finalkills', 'finalKills')
      else if (r.stat == 'bedsbroken') r.stat = r.stat.replace('bedsbroken', 'bedsBroken')

      if (!uhg.dc.cache.bw.roles[r.stat])uhg.dc.cache.bw.roles[r.stat] = []
      uhg.dc.cache.bw.roles[r.stat].push(r)
    }

    for (let sort in uhg.dc.cache.bw.roles) { uhg.dc.cache.bw.roles[sort].sort((a, b) => b.from - a.from) }

  } catch (e) {
    console.log(e)
  }
}


exports.uhg_refresh = async (uhg, member, api, guilda) => {
  let cache = uhg.dc.cache.uhgroles
  let guild = member.guild
  let user = member.user
  let errors = ``
  let grank = ''
  if (guilda.guildrank) grank = ('Guild ' + guilda.guildrank).replace('Guild Guild', 'Guild')
  else if (guilda.member) grank = ('Guild ' + guilda.member.rank).replace('Guild Guild', 'Guild')

  /* -- Change username -- */
  if (member.nickname && member.nickname !== api.username || member.nickname === null && user.username !== api.username) { try { await member.setNickname(api.username) } catch (e) {errors = errors + 'UHG - Change nickname\n'}}
  
  /* -- Default role -- */
  if (!member._roles.includes("478816107222925322")) await member.roles.add(guild.roles.cache.get("478816107222925322"))

  /* -- Guild role -- */
  if (guilda.name === "UltimateHypixelGuild" || guilda.guildrank) {
    if (!member._roles.includes(cache.get("Guild Member").id)) try { await member.roles.add(cache.get("Guild Member").role) } catch (e) {errors = errors + 'UHG - Guild Member role\n'}
    for (let role of cache) {
      if (role[0] == "Guild Member" || role[0] == "🌙Default🌙") continue
      role = role[1]
      if (member._roles.includes(role.id) && role.name!=grank) try { await member.roles.remove(role.role) } catch (e) {errors = errors + `UHG - ${role.name} role removal\n`}
      else if (!member._roles.includes(role.id) && role.name == grank) {try { await member.roles.add(role.role) } catch (e) {errors = errors + `UHG - ${role.name} role add\n`}}
    }
  } else {
    for (let role of cache) {
      if (role[0] == "🌙Default🌙") continue
      role = role[1]
      if (member._roles.includes(role.id)) {try { await member.roles.remove(role.role) } catch (e) {errors = errors + `UHG - ${role.name} role removal\n`}}
    }
  }

  /* -- Badges -- */
  if (api.stats) {
    let upRole = [];
    for (let stat in uhg.dc.cache.bRoles) {
      if (stat.endsWith('_ids')) continue;

      if (stat == 'SkyWars' || stat == 'Bedwars' || stat == 'UHC' || stat == 'SpeedUHC') {
        let staty = api.stats[stat.toLowerCase()]
        let level = Math.floor(staty.level)
        let up = uhg.dc.cache.bRoles[stat].filter(n => {
          if (!n.to && level >= n.from) return true
          else if (n.to && level >= n.from && n.to >= level) return true
          else return false
        })[0]
        if (up) upRole.push(up)
      } else if (stat == 'Duels' || stat == 'Arena' || stat == 'Walls' || stat == 'VampireZ') {
        let staty = api.stats[stat.toLowerCase()]
        let wins = staty.wins
        if (wins === undefined) wins = staty.overall.wins || 0
        let up = uhg.dc.cache.bRoles[stat].filter(n => {
          if (!n.to && wins >= n.from) return true
          else if (n.to && wins >= n.from && n.to > wins) return true
          else return false
        })[0]
        if (up) upRole.push(up)
      } else if (stat == 'Quake' || stat == 'Paintball') {
        let staty = api.stats[stat.toLowerCase()]
        let kills = staty.kills
        if (kills === undefined) kills = staty.overall.kills || 0
        let up = uhg.dc.cache.bRoles[stat].filter(n => {
          if (!n.to && kills >= n.from) return true
          else if (n.to && kills >= n.from && n.to >= kills) return true
          else return false
        })[0]
        if (up) upRole.push(up)
      } else if (stat == 'Blitz') {
        let wins = api.stats.wins.minigames.blitz || 0
        let up = uhg.dc.cache.bRoles[stat].filter(n => {
          if (!n.to && wins >= n.from) return true
          else if (n.to && wins >= n.from && n.to >= wins) return true
          else return false
        })[0]
        if (up) upRole.push(up)
      } else if (stat == 'TKR') {
        let wins = api.stats.tkr.gold || 0
        let up = uhg.dc.cache.bRoles[stat].filter(n => {
          if (!n.to && wins >= n.from) return true
          else if (n.to && wins >= n.from && n.to >= wins) return true
          else return false
        })[0]
        if (up) upRole.push(up)
      } else if (stat == 'bb') {
        let title = api.stats.bb.title || "DAviD"
        let up = uhg.dc.cache.bRoles.bb.filter(n => n.name.endsWith(title))[0]
        if (up) upRole.push(up)
      } else if (stat == 'CaC') {
        let color = api.stats.cac.color || "dAvID"
        let up = uhg.dc.cache.bRoles[stat].filter(n => n.name.endsWith(color + " Rank"))[0]
        if (up) upRole.push(up)
      }
    }

    let remove = member._roles.filter(n => uhg.dc.cache.split.badges.includes(n) && !upRole.filter(i => i.id == n).length)
    let add = upRole.filter(n => !member._roles.includes(n.id))

    for (let r_id of remove) {
      await member.roles.remove(guild.roles.cache.get(r_id))
      await uhg.delay(1000)
    }
    for (let aRole of add) {
      await member.roles.add(aRole.role)
      await uhg.delay(1000)
    }
  }


  /* ---- Split role ---- */
  try {
    /* -- Guild Split -- */
    let split_guild = uhg.dc.cache.splits.get('guild')
    if (member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && !member._roles.includes(split_guild.id)) await member.roles.add(split_guild.role)
    else if (!member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && member._roles.includes(split_guild.id)) await member.roles.remove(split_guild.role)

    /* -- Discord Split -- */
    let split_discord = uhg.dc.cache.splits.get('discord')
    if (member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && !member._roles.includes(split_discord.id)) await member.roles.add(split_discord.role)
    else if (!member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && member._roles.includes(split_discord.id)) await member.roles.remove(split_discord.role)

    /* -- Badges Split -- */
    let split_badges = uhg.dc.cache.splits.get('badges')
    if (member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && !member._roles.includes(split_badges.id)) await member.roles.add(split_badges.role)
    else if (!member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && member._roles.includes(split_badges.id)) await member.roles.remove(split_badges.role)

    /* -- SbBadges Split -- */
    let split_badges_sb = uhg.dc.cache.splits.get('badges_sb')
    if (member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && !member._roles.includes(split_badges_sb.id)) await member.roles.add(split_badges_sb.role)
    else if (!member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && member._roles.includes(split_badges_sb.id)) await member.roles.remove(split_badges_sb.role)

  } catch (e) { errors = errors + 'UHG - Split roles error'}


  

}

exports.bw_refresh = async (uhg, member, api) => {
  let guild = member.guild
  let user = member.user
  let errors = ''

  /* -- Change username -- */
  let bwNick = `[${Math.floor(api.stats.bedwars.level)}☆] ${api.username}`
  if (member.nickname && member.nickname !== bwNick || member.nickname === null && user.username !== bwNick) { try { await member.setNickname(bwNick) } catch (e) {errors = errors + 'BW - Change nickname\n'}}

  /* -- Verify role -- */
  if (!member._roles.includes("877239217795768340")) await member.roles.add(guild.roles.cache.get("877239217795768340"))

  /* -- Stats role -- */
  let upRole = [];
  for (let stat in uhg.dc.cache.bw.roles) {
    let staty = api.stats.bedwars[stat] || api.stats.bedwars.overall[stat]
    let up = uhg.dc.cache.bw.roles[stat].filter(n => staty >= n.from )[0]
    if (up) upRole.push(up)
  }

  let remove = member._roles.filter(n => uhg.dc.cache.bw.ids.includes(n) && !upRole.filter(i => i.id == n).length)
  let add = upRole.filter(n => !member._roles.includes(n.id))

  for (let r_id of remove) {
    await member.roles.remove(guild.roles.cache.get(r_id))
    await uhg.delay(1000)
  }
  for (let aRole of add) {
    await member.roles.add(aRole.role)
    await uhg.delay(1000)
  }
}


exports.unverify = async (uhg, user) => {
  let uGuild = uhg.dc.client.guilds.cache.get('455751845319802880')
  let bwGuild = uhg.dc.client.guilds.cache.get('874337528621191251')

  let uMember = uGuild.members.cache.get(user.id)
  let bwMember = bwGuild.members.cache.get(user.id)
  if (uMember) {
    if (uMember.nickname) {try { await uMember.setNickname(null) } catch (e) {}}
    for (let role of uhg.dc.cache.uhgroles) { if (uMember._roles.includes(role[1].id)) {try { await uMember.roles.remove(role[1].role) } catch (e) {}}}
    for (let role of uhg.dc.cache.badges) {if (uMember._roles.includes(role[1].id)) {try { await uMember.roles.remove(role[1]) } catch (e) {}}}
    for (let role of uhg.dc.cache.badges_sb) { if (uMember._roles.includes(role[1].id)) {try { await uMember.roles.remove(role[1]) } catch (e) {}}}
  }

  if (bwMember) {
    if (bwMember.nickname) {try { await bwMember.setNickname(null) } catch (e) {}}
    for (let role of uhg.dc.cache.bw.allroles) {
      if (bwMember._roles.includes(role.id)) {try { await bwMember.roles.remove(role) } catch (e) {}}
    }
  }

    /* ---- UHG Split role ---- */
    try {
      /* -- Guild Split -- */
      let split_guild = uhg.dc.cache.splits.get('guild')
      if (member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && !member._roles.includes(split_guild.id)) await member.roles.add(split_guild.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.guild.includes(n)) && member._roles.includes(split_guild.id)) await member.roles.remove(split_guild.role)
  
      /* -- Discord Split -- */
      let split_discord = uhg.dc.cache.splits.get('discord')
      if (member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && !member._roles.includes(split_discord.id)) await member.roles.add(split_discord.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.discord.includes(n)) && member._roles.includes(split_discord.id)) await member.roles.remove(split_discord.role)
  
      /* -- Badges Split -- */
      let split_badges = uhg.dc.cache.splits.get('badges')
      if (member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && !member._roles.includes(split_badges.id)) await member.roles.add(split_badges.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.badges.includes(n)) && member._roles.includes(split_badges.id)) await member.roles.remove(split_badges.role)
  
      /* -- SbBadges Split -- */
      let split_badges_sb = uhg.dc.cache.splits.get('badges_sb')
      if (member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && !member._roles.includes(split_badges_sb.id)) await member.roles.add(split_badges_sb.role)
      else if (!member._roles.some(n=>uhg.dc.cache.split.badges_sb.includes(n)) && member._roles.includes(split_badges_sb.id)) await member.roles.remove(split_badges_sb.role)
  
    } catch (e) {}
  
}

