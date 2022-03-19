module.exports = {
  name: "database",
  description: "Automatická aktualizace databáze"
  time: '*/10 * * * * *', // '*/10 * * * * *' or 10000 <-- maybe?
  run: async (uhg) => {
    try {
      console.log("refresh now")
    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
