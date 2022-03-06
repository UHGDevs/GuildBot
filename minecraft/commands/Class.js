const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Class",
  aliases: ["class", "classes"],
  run: async (pmsg, client=null) => {
    try {
      let nickname = pmsg.nickname
      let api = await getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["dungeons"])
      if (api instanceof Object == false) return api
      let dungeons = api.skyblock.dungeons
      let profile; 
      let overallclassxp = 0;
      for (let i=0; i<Object.keys(dungeons).length; i++) {
        if (Object.values(dungeons)[i].overallclassxp >= overallclassxp) {
          profile = Object.keys(dungeons)[i]
          overallclassxp = Object.values(dungeons)[i].overallclassxp
        }
      }
      if (!profile) return `**${nickname}** nehrál dungeony`
      let profil = dungeons[profile]
      let cata = profil.level || 0
      let healer = profil.healerlvl || 0
      let mage = profil.magelvl || 0
      let archer = profil.archerlvl || 0
      let tank = profil.tanklvl || 0
      let berserk = profil.tanklvl || 0
      let classavg = profil.classavg || 0
      let message = `Class: [${f(classavg)} CA] **${api.username}** - H: ${healer}, M: ${mage}, B: ${berserk}, A: ${archer}, T: ${tank} (${cata} Cata)`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Class příkazu!"
    }
  }
}
