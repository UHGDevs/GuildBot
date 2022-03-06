const { getApi, getGuild } = require("../../../handlers/api")
const { f, getGuildLevel } = require("../../../handlers/func")
module.exports = {
  name: "Member",
  aliases: ["member", "guild"],
  run: async (pmsg, client=null) => {
    try{
      let api = await getApi(pmsg.nickname)
      if (api instanceof Object == false) return message
      let guild = await getGuild(api.uuid)
      if (!guild) return `**${api.username}** - Guild: Žádná`
      let joined;
      let grank;

      for (let i=0; i<guild.members.length; i++) {
        if (guild.members[i].uuid == api.uuid) {
          joined = guild.members[i].joined
          grank = guild.members[i].rank
        }
      }
      let timein = Math.floor((new Date().getTime()-joined)/ 86400000)
      message = `**${grank} ${api.username}** - [${f(getGuildLevel(guild.exp))}] ${guild.name} - ${timein}d`
      return message
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v Member příkazu!"
    }
  }
}
