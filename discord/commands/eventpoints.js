module.exports = {
  name: "eventpoints",
  aliases: ["points"],
  allowedids: [],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {

      let database = await uhg.mongo.run.get('general', 'uhg')
      database = database.filter(n=>n.points_0).sort((a, b) => (b.points_0 || 0 ) - (a.points_0 || 0))

      let lb = []
      database.forEach((member, i) => {
        if (member.username == "Farmans") return
        if (member.username == "Filipixx") i = 6
        lb.push(`\`#${i+1}\` ${member.username}: \`${member.points_0}points\``)
      });

      return lb.join('\n') || "Nikdo nemá žádné body"
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v eventpoints příkazu!"
    }
  }
}
