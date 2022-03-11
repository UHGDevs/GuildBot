const constants = require('../src/skyblockconstants')

module.exports = class Functions {
  constructor() {
    this.getApi = require("./api")
  }

  delay(ms) {new Promise(res => setTimeout(res, ms))}

  clear(message) { return message.replace(/✫|✪|⚝/g, '?').replace(/§|¡±/g, '�').replace(/�[0-9A-FK-OR]/gi, '') }

  f(number, max=2) {
    if (!Number(number)) return number
    return Number(number).toLocaleString('en', {minimumFractionDigits: 0, maximumFractionDigits: max})
  }
  r(n){
    try {o = Number(n)} catch (e) {return n}
    d = String(n).length
    p = Math.pow
    d = p(10,d)
    i=7
    while(i)(s=p(10,i--*3))<=n&&(n=Math.floor(Math.round(n*d/s)/d)+"kMGTPE"[i])
    return n
  }

  ratio(n1=0, n2=0, n3=2) {
    var options = {minimumFractionDigits: 0, maximumFractionDigits: n3};
    return Number(Number(isFinite(n1 / n2) ? + (n1 / n2) : n1).toLocaleString('en', options))
  }

  romanize(num) {
    if (num == 0) return 0
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  toTime(sec) {
    let days = sec / 60 / 60 / 24
    let hours = sec / 60 / 60 % 24
    let formatted = `${Math.floor(Number(days))}d ${Math.floor(Number(hours))}h`
    let final = {formatted:formatted, h:sec/60/60, d: sec/60/60/24, m: sec/60, s: sec}
    return final
  }

  getMilestones(first, second) {
    if (second == 0) return {next: Math.ceil(first), need: 1}
    return {next: Math.ceil(first/second), need: Math.ceil(first/second) * second - first}
 }

  getNwLevel(exp) { return Math.sqrt(Number(exp) * 2 + 30625) / 50 - 2.5 }

  getSwLevel(xp) {
    var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
    var exactLevel = 0
    if (xp >= 15000) {
          exactLevel = (xp - 15000) / 10000 + 12;
      } else {
        for (i = 0; i < xps.length; i++) {
          if (xp < xps[i]) {
            exactLevel = i + (xp - xps[i-1]) / (xps[i] - xps[i-1]);
            break;
          }
        }
      }
    return exactLevel;
  }

  getSwExpLeft(xp) {
    var xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000]
    if (xp >= 15000) return 10000 - ((xp - 15000) % 10000)
    else {
      for (let i=0; i < xps.length; i++){
        if (xp < xps[i]) return Number((xp - xps[i]) / -1)
      }
    }
  }

  getRankedPosition(pos) {
    if (pos == 0) return ""
    else if ( pos > 1 && pos <= 10) return "Masters"
    else if ( pos > 10 && pos <= 200) return "Diamond"
    else if ( pos > 200 && pos <= 1500) return "Gold"
    else if ( pos > 1500 && pos <= 5000) return "Iron"
    else if ( pos > 5000 && pos <= 20000) return "Stone"
    else if ( pos > 20000 && pos <= 50000) return "Wood"
    else return ""
  }

  getBwLevel(exp = 0) {
    function getBwExpForLevel(level) {
      var progress = level % 100
      if (progress > 3) return 5000;
      return {
        0: 500,
        1: 1000,
        2: 2000,
        3: 3500
      }[progress]
    }
    var prestiges = Math.floor(exp / 487000);
    var level = prestiges * 100;
    var remainingExp = exp - (prestiges * 487000);

    for (let i = 0; i < 4; ++i) {
        var expForNextLevel = getBwExpForLevel(i)
        if (remainingExp < expForNextLevel) break;
        level++
        remainingExp -= expForNextLevel
    }

    return parseFloat((level + (remainingExp / 5000)).toFixed(2))
}

  getPitPrestige(xp) {
    var xps = [1.1, 1.2]
  }

  getGuildLevel(exp) {
  const EXP_NEEDED = [ 100000, 150000, 250000, 500000, 750000, 1000000, 1250000, 1500000, 2000000, 2500000, 2500000, 2500000, 2500000, 2500000, 3000000];
  let level = 0;
  for (let i = 0; i <= 1000; i += 1) {
    let need = 0;
    if (i >= EXP_NEEDED.length) {
      need = EXP_NEEDED[EXP_NEEDED.length - 1];
    } else { need = EXP_NEEDED[i]; }
    if ((exp - need) < 0) {
      return level + (exp / need);
    }
    level += 1;
    exp -= need;
  }
  return 1000;
}

  getOnline(json) {
    let online = {}
    let game = renameHypixelGames(json.gameType || null)
    let mode = getGameMode(json.mode || null)
    online.title = "Online"
    online.game = game
    if (mode == "LOBBY") {
      online.modtitle = "Mode"
      online.footer = `Je v ${game} Lobby`
      online.type = `${game} Lobby`
      online.mode = mode
    } else if (game == "replay"){
      online.footer = `Sleduje replay`
    } else {
      if (game == "SkyBlock") online.modtitle = "SkyBlock Místo"
      else online.modtitle = "Mode"
      online.footer = `Hraje ${game}`
      online.type = game
      online.map = json.map || null
      online.mode = mode
    }
    return online
  }

  getSlayerLvl(xp, slayer) {
    //return 0
    let zombiexp = [5, 15, 200, 1000, 5000, 20000, 100000, 400000, 1000000]
    let spiderxp = [5, 25, 200, 1000, 5000, 20000, 100000, 400000, 1000000]
    let wolfemanxp = [10, 30, 250, 1500, 5000, 20000, 100000, 400000, 1000000]
    let exactlvl = 0
    for (let i = 0; i < 9; i++) {
      if (slayer == "zombie") {
        if (xp < zombiexp[i]) {
          return i
          // console.log(xp)
          // console.log(i)
          return exactlevel = i + (xp - zombiexp[i-1]) / (zombiexp[i] - zombiexp[i-1]);
        // break;
        }
      }
      else if (slayer == "spider") {
        if (xp < spiderxp[i]) {
          return i
          return exactlevel = i + (xp - spiderxp[i-1]) / (spiderxp[i] - spiderxp[i-1]);
        // break;
        }
      }
      else if (slayer == "wolf" || slayer == "eman") {
        if (xp < wolfemanxp[i]) {
          return i
          return exactlevel = i + (xp - wolfemanxp[i-1]) / (wolfemanxp[i] - wolfemanxp[i-1]);
        //  break;
        }
      }
    }
    return 9;
  }

  getCataLvl(exp) {
    if (exp >= 569809640) return 50
    let levels = {'1': 50, '2': 125, '3': 235, '4': 395, '5': 625, '6': 955, '7': 1425, '8': 2095, '9': 3045, '10': 4385, '11': 6275, '12': 8940, '13': 12700, '14': 17960, '15': 25340, '16': 35640, '17': 50040, '18': 70040, '19': 97640, '20': 135640, '21': 188140, '22': 259640, '23': 356640, '24': 488640, '25': 668640, '26': 911640, '27': 1239640, '28': 1684640, '29': 2284640, '30': 3084640, '31': 4149640, '32': 5559640, '33': 7459640, '34': 9959640, '35': 13259640, '36': 17559640, '37': 23159640, '38': 30359640, '39': 39559640, '40': 51559640, '41': 66559640, '42': 85559640, '43': 109559640, '44': 139559640, '45': 177559640, '46': 225559640, '47': 285559640, '48': 360559640, '49': 453559640, '50': 569809640}
    for (let i=1;i<=50;i++) {
      if (exp <= levels[i]) return i - 1
    }
    return 0
  }

  getLevelByXp(xp, type, levelCap) {
    let xpTable;
    switch (type) {
      case 'runecrafting':
        xpTable = constants.runecrafting_xp;
        break;
      case 'dungeons':
        xpTable = constants.dungeon_xp;
        break;
      default:
        xpTable = constants.leveling_xp;
    }
    let maxLevel = Math.max(...Object.keys(xpTable));
    if (constants.skills_cap[type] > maxLevel) {
      xpTable = Object.assign(constants.xp_past_50, xpTable);
      maxLevel = typeof levelCap === 'number' ?
        maxLevel + levelCap :
        Math.max(...Object.keys(xpTable));
    }
    if (isNaN(xp)) {
      return {
        xp: 0,
        level: 0,
        maxLevel,
        xpCurrent: 0,
        xpForNext: xpTable[1],
        progress: 0
      };
    }
    let xpTotal = 0;
    let level = 0;
    let xpForNext = 0;
    for (let x = 1; x <= maxLevel; x++) {
      xpTotal += xpTable[x];
      if (xpTotal > xp) {
        xpTotal -= xpTable[x];
        break;
      } else {
        level = x;
      }
    }
    const xpCurrent = Math.floor(xp - xpTotal);
    if (level < maxLevel) xpForNext = Math.ceil(xpTable[level + 1]);
    const progress = Math.floor((Math.max(0, Math.min(xpCurrent / xpForNext, 1))) * 100);
    return level /* {
      xp,
      level,
      maxLevel,
      xpCurrent,
      xpForNext,
      progress
    }; */
  }

  getRank(json) {
    function replaceRank (rank) { return rank.replace(/§.|\[|]/g, '').replace('SUPERSTAR', "MVP++").replace('VIP_PLUS', 'VIP+').replace('MVP_PLUS', 'MVP+').replace('NONE', 'MVP+').replace("GAME_MASTER", "GM").replace("YOUTUBER", "YOUTUBE").replace("OWNER", "OWNER").replace("EVENTS", "EVENTS").replace("MOJANG", "MOJANG").replace("ADMIN", "ADMIN")}
    let rank = json.prefix || json.rank || json.monthlyPackageRank || json.packageRank || json.newPackageRank || false
    if (!rank) return {rank: "NON", prefix: json.displayname}
    return { rank: replaceRank(rank), prefix: `[${replaceRank(rank)}] ${json.displayname}` }
  }

  getPlusColor(rank, plus) {
    if (plus == undefined || rank == 'PIG+++' || rank == "OWNER" || rank == "ADMIN" || rank == "GM") {
      var rankColor = {
        'MVP': { mc: '§b', hex: '#55FFFF' },
        'MVP+': { mc: '§c', hex: '#FF5555' },
        'MVP++': { mc: '§c', hex: '#FFAA00' },
        'VIP+': { mc: '§a', hex: '#55FF55' },
        'VIP': { mc: '§a', hex: '#55FF55' },
        'PIG+++': { mc: '§d', hex: '#FF55FF' },
        'OWNER': { mc: '§c', hex: '#FF5555' },
        'ADMIN': { mc: '§c', hex: '#FF5555' },
        'GM': { mc: '§2', hex: '#00AA00' },
      }[rank]
      if (!rankColor) return { mc: '§7', hex: '#BAB6B6' }
    } else {
      var rankColorMC = {
        RED: { mc: '§c', hex: '#FF5555' },
        GOLD: { mc: '§6', hex: '#FFAA00' },
        GREEN: { mc: '§a', hex: '#55FF55' },
        YELLOW: { mc: '§e', hex: '#FFFF55' },
        LIGHT_PURPLE: { mc: '§d', hex: '#FF55FF' },
        WHITE: { mc: '§f', hex: '#F2F2F2' },
        BLUE: { mc: '§9', hex: '#5555FF' },
        DARK_GREEN: { mc: '§2', hex: '#00AA00' },
        DARK_RED: { mc: '§4', hex: '#AA0000' },
        DARK_AQUA: { mc: '§3', hex: '#00AAAA' },
        DARK_PURPLE: { mc: '§5', hex: '#AA00AA' },
        DARK_GRAY: { mc: '§8', hex: '#555555' },
        BLACK: { mc: '§0', hex: '#000000' },
        DARK_BLUE: { mc: '§1', hex: '#0000AA'}
      }[plus]
      if (!rankColorMC) return { mc: '§7', hex: '#BAB6B6' }
    }
    return rankColor || rankColorMC;
  }

  // Arena Brawl
  getArena(setup) {
    if (!setup) return
    return setup
      .toLowerCase()
      .replace(/_/gi, " ")
      .replace("boulder toss", "Boulder Toss")
      .replace("shotgun", "Cookie Shotgun")
      .replace("falcon punch", "Falcon Punch")
      .replace("fireball", "Fireball")
      .replace("flame breath", "Flame Breath")
      .replace("freezing breath", "Freezing Breath")
      .replace("rocket pig", "Guided Pig 2000")
      .replace("lightning strike", "Lightning Strike")
      .replace("melon launcher", "Melon Launcher")
      .replace("pumpkin launcher", "Pumpkin Launcher")
      .replace("proximity mine", "Proximity Mine")
      .replace("rocket chicken", "Rocket Chicken")
      .replace("seismic wave", "Seismic Wave")
      .replace("snowball", "Snowball")
      .replace("flame sword", "Flame Sword")
      .replace("ancient breath", "Ancient Breath")

      .replace("barricade", "Barricade")
      .replace("charge", "Bull Charge")
      .replace("golemfall", "Golemfall")
      .replace("polymorph", "Petrify")
      .replace("shadow step", "Shadow Step")
      .replace("swap", "Swap")
      .replace("wall of vines", "Wall of Vines")
      .replace("magnetic impulse", "Magnetic Impulse")

      .replace("bone shield", "Bone Shield")
      .replace("cactus shield", "Cactus Shield")
      .replace("healing totem", "Healing Totem")
      .replace("holy water", "Holy Water")
      .replace("life leech", "Life Leech")
      .replace("star shield", "Star Shield")
      .replace("tree of life", "Tree of Life")
      .replace("spirit link", "Spirit Link")
      .replace("vampiric chain", "Vampiric Chain")
      .replace("time warp", "Time Warp")

      .replace("shield wall", "Shield Wall")
      .replace("arachnid", "Broodmother")
      .replace("doom shroom", "Doom Shroom")
      .replace("bersek", "Berserk")
      .replace("reflect damage", "Reflect Damage")

      .replace("damage", "Damage")
      .replace("energy", "Energy")
      .replace("speed", "Speed")
      .replace("tank", "Defence")
      .replace("slowing", "Slowing")
      .replace("none", "No")
      .replace("no", "No")
      .replace("SNowball", "Snowball")
  }

  // status
  getStatus(status) {
    if (!status) return
    return status.toLowerCase()
        .replace("dynamic", "Private Island")
        .replace("hub", "Hub")
        .replace("dungeon hub", "Dungeon Hub")
        .replace("combat 1", "Spider's Den")
        .replace("combat 2", "Blazing Fortress")
        .replace("combat 3", "The End")
        .replace("foraging 1", "The Park")
        .replace("farming 1", "Farming Islands")
        .replace("mining 1", "Gold Mine")
        .replace("mining 2", "Deep Caverns")
        .replace("mining 3", "Dwarven Mines")
        .replace("crystal hollows", "Crystal Hollows")
        .replace("dungeon", "Catacombs")
        .replace("dark auction", "Dark Auction")

        .replace("pit", "")
        .replace("housing", "Housing")
  }


  renameHypixelGames(game){
    if (game === null || game === undefined) return
    else {
      return game.toLowerCase()
        .replace("skywars", "SkyWars")
        .replace("bedwars", "BedWars")
        .replace("gingerbread", "TKR")
        .replace("mcgo", "Cops & Crims")
        .replace("super_smash", "Smash Heroes")
        .replace("skyblock", "SkyBlock")
        .replace("murder_mystery", "Murder Mystery")
        .replace("legacy", "Classic Games")
        .replace("survival_games", "Blitz SG")
        .replace("uhc", "UHC")
        .replace("speed_uhc", "Speed UHC")
        .replace("tntgames", "TNT Games")
        .replace("pit", "The Hypixel Pit")
        .replace("arcade", "Arcade Games")
        .replace("walls3", "Mega Walls")
        .replace("arena", "Arena Brawl")
        .replace("vampirez", "VampireZ")
        .replace("walls", "The Walls")
        .replace("battleground", "Warlords")
        .replace("build_battle", "Build Battle")
    }
  }

  getGameMode(gamemode) {
    if (gamemode === null || gamemode === undefined) return
    else {
      return gamemode.toLowerCase()
        .replace(/bedwars_eight_one/g, "BedWars Solo")
        .replace(/bedwars_eight_two/g, "BedWars Doubles")
        .replace(/bedwars_four_three/g, "BedWars 3s")
        .replace(/bedwars_four_four/g, "BedWars 4s")
        .replace(/bedwars_two_four/g, "BedWars 4v4")
        .replace(/_/g, " ")
    }
  }
}
