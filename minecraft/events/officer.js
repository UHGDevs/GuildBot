let bridge = require(`../bridge.js`)
module.exports = async (uhg, pmsg) => {
  if (pmsg.msg.match(/^Officer > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else await bridge.info(uhg, pmsg)

  if (pmsg.command === "GjoininG") return require("../other/getjoined.js")(uhg, pmsg)
  if (pmsg.command) {
    console.log("MM")
    await bridge.send(uhg, pmsg.command + " - command comming soon (Its going to be here)", "Officer") //await uhg.dc.channels.botjs.send(pmsg.command + " - command comming soon")
  }
}
