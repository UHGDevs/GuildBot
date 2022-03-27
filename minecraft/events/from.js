let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
  console.log(pmsg)
  if (!pmsg.command) return "neni command"

  let command = uhg.mc.commands.get(pmsg.command)
  if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
  if (command) pmsg.send = await command.run(uhg, pmsg) || "random error (napis davidovi)"
  if (pmsg.send) await chat.send(uhg, pmsg)
}
