let bridge = require(`../bridge.js`)
module.exports = async (uhg, pmsg) => {
  if (pmsg.msg.match(/^Officer > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else await bridge.info(uhg, pmsg)

  if (pmsg.command === "GjoininG") return require("../other/getjoined.js")(uhg, pmsg)
  if (pmsg.command) {
    let command = uhg.mc.commands.get(pmsg.command)
    if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
    let res = "Neznámý command"
    if (command) res = await command.run(uhg, pmsg);
    pmsg.send = res
    await bridge.send(uhg, pmsg.send)
    await chat.send(uhg, pmsg)
  }
}
