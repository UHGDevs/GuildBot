const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Powder",
  aliases: ["powder", "gemstone", "mithril", "gemstonepowder", "mithrilpowder", "mining"],
  run: async (pmsg, client=null) => {
    try {
      let nickname = pmsg.nickname
      let api = await getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["mining"])
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
      console.log(profile)
      console.log(profil)
      let message = `Powder: **${api.username}** - Mithril: ${f(mithril)} - Gemstone: ${f(gemstone)}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Powder příkazu!"
    }
  }
}
