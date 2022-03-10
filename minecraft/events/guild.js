module.exports = async (uhg, pmsg) => {
  if (pmsg.username) await uhg.dc.channels.botjs.send(((pmsg.rank||"") + " " + pmsg.username + ": " +pmsg.content).trim())
  else await uhg.dc.channels.botjs.send(pmsg.msg)

  if (pmsg.command) await uhg.dc.channels.botjs.send(pmsg.command + " - command comming soon")

}
