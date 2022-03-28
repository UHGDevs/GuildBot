let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
  if (!pmsg.command) return "neni command"

  if (pmsg.command == "sniped") {
    let sniped = uhg.snipe.get(uhg.snipe.find(n=>n.notify==pmsg.username).username)
    if (!sniped) return chat.send(uhg, {send: `/msg ${pmsg.username} neexistuje`})
    sniped.sniped = true
    uhg.snipe.set(sniped.username, sniped)
    return chat.send(uhg, {send: `/msg ${pmsg.username} noted`})
  }
  if (pmsg.command == "sniper" && pmsg.args && pmsg.args.split(" ")[0]=="stop") {
    let sniped = uhg.snipe.get(uhg.snipe.find(n=>n.notify==pmsg.username).username)
    if (!sniped) return
    uhg.snipe.delete(sniped.username)
    chat.send(uhg, {send: `/msg ${pmsg.username} stopped`})
  }

  let command = uhg.mc.commands.get(pmsg.command)
  if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
  if (command) pmsg.send = await command.run(uhg, pmsg) || "random error (napis davidovi)"
  if (pmsg.send) await chat.send(uhg, pmsg)
}
