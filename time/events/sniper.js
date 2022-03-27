module.exports = {
  name: "sniper",
  description: "Dont Ask",
  time: '*/5 * * * * *', //'*/10 * * * * *'
  ignore: '* * * * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    try {
      if (!uhg.snipe.size) return
      for (let item of uhg.snipe) {
        console.time("Sniper run")
        await item[1].run()
        console.timeEnd("Sniper run")
        await uhg.func.delay(1000)
      }
      //uhg.snipe.forEach(item => {item.run()});
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v auto snipu!"
    }
  }
}
