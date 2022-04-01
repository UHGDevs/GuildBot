module.exports = {
  name: "Powder",
  aliases: ["powder", "gemstone", "mithril", "gemstonepowder", "mithrilpowder", "mining"],
  run: async (uhg, pmsg) => {
    try {
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["mining"])
      if (api instanceof Object == false) return api
      let mining = api.skyblock.mining
      let profile;
      let sum = 0;
      let mithril = 0;
      let gemstone = 0;
      for (let i=0; i<Object.keys(mining).length; i++) {
        if (Object.values(mining)[i].sum >= sum) {
          profile = Object.keys(mining)[i]
          sum = Object.values(mining)[i].sum
          mithril = Object.values(mining)[i].mithril
          gemstone = Object.values(mining)[i].gemstone
        }
      }
      let profil = mining[profile]
      let message = `Powder: **${api.username}** - Mithril: ${uhg.f(mithril)} - Gemstone: ${uhg.f(gemstone)}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Powder příkazu!"
    }
  }
}
