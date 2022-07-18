module.exports = {
  name: "finder",
  description: "Find and play!",
  emoji: '📄',
  time: '0 * * * * *', //'*/10 * * * * *'
  ignore: '* * * * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: false,
  run: async (uhg) => {
    try {
      let data = await uhg.mongo.run.get("general", "guildfind")
      data.forEach(item => {
        if (item.updated+1000*60*60<Number(new Date())) uhg.mongo.run.delete("general", "guildfind", {_id: item._id})
      });
      return
    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v finder refresh!"
    }
  }
}
