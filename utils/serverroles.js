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
    uhg.dc.cache.bw = {roles: [], ids: []}
    let guild = uhg.dc.client.guilds.cache.get('874337528621191251')
    if (!guild) return console.log('Nejsem na bw dc')

    let allroles = ["FKDR", "WLR", "BBLR", "wins", "Final Kills", "Beds Broken", "Prestige"] //"Challenges Completed"
    let pres = ["Stone", "Iron", "Gold", "Diamond", "Emerald", "Sapphire", "Ruby", "Crystal", "Opal", "Amethyst", "Rainbow"]
    let roles = guild.roles.cache.filter(n => uhg.includesWithArray(n.name, allroles))

    for (let role of roles) {
      role = role[1]
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