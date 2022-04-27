module.exports = {
  name: "Cakes",
  aliases: ["cakes", "cake"],
  run: async (uhg, pmsg) => {
    try{
      console.log(pmsg)
      let args = pmsg.args.split(' ')
      if (!args.length) return '!cakes on|off'

      if (args[0] == 'off') {
        uhg.mongo.run.update('general', 'uhg', { username: pmsg.username }, { cakes: {} })
        return 'Už nebudeš dostávat cakes upozornění'
      } else if (args[0] != 'on') return '!cakes on|off'
      if (args.length < 2) return '!cakes on [profile]'

      let profile = args[1]
      let message = `coming soon (zapínání na profil ${profile})`
      uhg.mongo.run.update('general', 'uhg', { username: pmsg.username }, { cakes: {toggle: true, profile: profile} })
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Cakes příkazu!"
    }
  }
}
