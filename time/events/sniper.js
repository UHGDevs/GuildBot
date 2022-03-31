module.exports = {
  name: "sniper",
  description: "Dont Ask",
  time: '*/5 * * * * *', //'*/10 * * * * *'
  ignore: '* * * * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: false,
  run: async (uhg) => {
    try {
      if (!uhg.snipe.size) return
      for (let item of uhg.snipe) {
        await item[1].run()
      }
      //uhg.snipe.forEach(item => {item.run()});
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v auto snipu!"
    }
  }
}
