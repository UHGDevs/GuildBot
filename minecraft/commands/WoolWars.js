module.exports = {
  name: "WoolWars",
  aliases: ["ww", "wool", "wools", "woolwars"],
  run: async (uhg, pmsg) => {
    const f = uhg.func.f
    try{
      return "Není v api :/"
      let nickname = pmsg.nickname
      let api = await uhg.func.getApi(nickname)
      if (api instanceof Object == false) return api
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v BedWars příkazu!"
    }
  }
}
