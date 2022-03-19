let bridge = require(`../bridge.js`)
let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
  if (pmsg.msg.match(/^Guild > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else await bridge.info(uhg, pmsg)

  if (!pmsg.command) return
  let command = uhg.mc.commands.get(pmsg.command)
  if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
  let res = "Neznámý command"
  if (command) res = await command.run(uhg, pmsg);


  pmsg.send = res
  await bridge.send(uhg, pmsg.send) //await uhg.dc.channels.botjs.send(pmsg.command + " - command comming soon")

  await chat.send(uhg, pmsg)
}
