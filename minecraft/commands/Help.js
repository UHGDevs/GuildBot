module.exports = {
  name: "Help",
  aliases: ["help"],
  run: async (uhg, pmsg) => {
    try{
      let message = `[!help] | Ahoj, já jsem UHG Guild BOT, všechny dostupné příkazy najdeš v !commands`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Help příkazu!"
    }
  }
}
