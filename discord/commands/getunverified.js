module.exports = {
  name: "getunverified",
  aliases: ["getun"],
  allowedids: ["312861502073995265", "379640544143343618", "427198829935460353", "378928808989949964"],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      if (!uhg.data.unverified) return "Error, počkej prosím chvíli (nebo napiš Davidovi)"
      let args = content.split(" ")
      if (!content || !args.length) {
        let send = []
        uhg.data.unverified.forEach(player => {send.push(`${player.name} - ${player.joined}D`)});
        return send.join("\n")
      }

      let nickname = args[0]
      let player = uhg.data.unverified.filter(n => n.name.toLowerCase()==nickname.toLowerCase())
      if (!player.length) return "Hráč nebyl nalezen"
      return `${player[0].name} - ${player[0].joined}D`
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v get unverified příkazu!"
    }
  }
}
