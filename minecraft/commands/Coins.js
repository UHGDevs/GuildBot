module.exports = {
  name: "Coins",
  aliases: ["coins", "purse", "bank", "coin", "coiny", "mince"],
  run: async (uhg, pmsg) => {
    try {
      let nickname = pmsg.nickname
      let api = await uhg.getApi(nickname, ["api", "skyblock", "hypixel", "mojang"], ["main"])
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
      if (apioff == true) return `Coins: **${api.username}** - Purse: ${uhg.f(purse).split(".")[0]} (BANK API OFF)`
      console.log(profile)
      let message = `Coins: [${uhg.f(sum).split(".")[0]}] **${api.username}** - Purse: ${uhg.f(purse).split(".")[0]} - Bank: ${uhg.f(bank).split(".")[0]}`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Coins příkazu!"
    }
  }
}
