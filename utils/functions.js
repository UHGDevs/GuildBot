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
}
