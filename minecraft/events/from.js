module.exports = async (uhg, pmsg) => {
  console.log(pmsg)
  if (!pmsg.command) return "neni command"
  console.log(pmsg.command)
  uhg.dc.channels.botjs.send(`${pmsg.command} - command coming soon`)
}
