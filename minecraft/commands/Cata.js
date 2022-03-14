module.exports = {
  name: "Cata",
  aliases: ["cata", "catacombs"],
  run: async (uhg, pmsg) => {
    try {
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["dungeons"])
      if (api instanceof Object == false) return api
      let dungeons = api.skyblock.dungeons
      let profile;
      let level = 0;
      console.log(dungeons)
      for (let i=0; i<Object.keys(dungeons).length; i++) {
        if (Object.values(dungeons)[i].level >= level) {
          profile = Object.keys(dungeons)[i]
          level = Object.values(dungeons)[i].level
        }
      }
      if (!profile) return `**${api.username}** nehrál dungeony`
      let profil = dungeons[profile]
      let catalevel = profil.level || 0
      let secrets = profil.secrets || 0
      let secretsratio = profil.secretsratio || 0
      let clas = profil.class || "nic"
      let message = `Cata: [${catalevel}] **${api.username}** - ${uhg.func.f(secrets)} secrets - ${uhg.func.f(secretsratio)} secrets/run (${clas})`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Catacombs příkazu!"
    }
  }
}
