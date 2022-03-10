module.exports = async (uhg, pmsg) => {

  console.log(`Guild Chat > ${pmsg.username}: ${pmsg.content}`)

  await uhg.dc.channels.botjs.send(pmsg.username + ": " +pmsg.content)
}
