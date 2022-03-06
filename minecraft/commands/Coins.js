const { getApi } = require("../../../handlers/api")
const { f } = require("../../../handlers/func")
module.exports = {
  name: "Coins",
  aliases: ["coins", "purse", "bank", "coin", "networth", "nw", "coiny", "mince"],
  run: async (pmsg, client=null) => {
    try {
      let nickname = pmsg.nickname
      let api = await getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["main"])
      if (api instanceof Object == false) return api
      let coins = api.skyblock.main
      let profile;
      let sum = 0;
      let bank = 0;
      let purse = 0;
      for (let i=0; i<Object.keys(coins).length; i++) {
        if (Object.values(coins)[i].sum >= sum) {
          profile = Object.keys(coins)[i]
          sum = Object.values(coins)[i].sum
          bank = Object.values(coins)[i].bank
          purse = Object.values(coins)[i].purse
        }
      }
      let profil = coins[profile]
      let apioff = profil.apioff
      if (apioff == true) return `Coins: **${api.username}** - Purse: ${f(purse)} (BANK API OFF)`
      console.log(profile)
      let message = `Coins: [${f(sum)}] **${api.username}** - Purse: ${f(purse)} - Bank: ${f(bank)}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Coins příkazu!"
    }
  }
}
