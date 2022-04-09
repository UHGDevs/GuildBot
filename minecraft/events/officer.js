let bridge = require(`../bridge.js`)
let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
  if (pmsg.msg.match(/^Officer > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else if (pmsg.event != "grequest") await bridge.info(uhg, pmsg)

  if (pmsg.event === "grequest") return require("../other/getjoined.js")(uhg, pmsg)
  if (pmsg.command) {
    let command = uhg.mc.commands.get(pmsg.command)
    if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
    let res = "Neznámý command"
    if (command) res = await command.run(uhg, pmsg);
    pmsg.send = res
    await bridge.send(uhg, pmsg.send, "Officer")
    await chat.send(uhg, pmsg)
  }
}
