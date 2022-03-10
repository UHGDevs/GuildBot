let bridge = require(`../bridge.js`)
module.exports = async (uhg, pmsg) => {
  if (pmsg.msg.match(/^Guild > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else await bridge.info(uhg, pmsg)

  if (!pmsg.command) return
  await bridge.send(uhg, pmsg.command + " - command comming soon (Its going to be here)") //await uhg.dc.channels.botjs.send(pmsg.command + " - command comming soon")

}
