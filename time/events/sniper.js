module.exports = {
  name: "sniper",
  description: "Dont Ask",
  time: '*/5 * * * * *', //'*/10 * * * * *'
  ignore: '* * * * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    let now = Number(new Date())
    try {
      if (!uhg.snipe.size) return
      uhg.snipe.forEach(item => {item.run()});  
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v auto snipu!"
    }
  }
}
