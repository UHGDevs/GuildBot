module.exports = {
  name: "gmembers",
  description: "Automatická aktualizace databáze",
  time: '0 */5 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    let now = Number(new Date())
    try {
      let data = await uhg.mongo.run.get("general", "verify")
      console.log(data)

      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
