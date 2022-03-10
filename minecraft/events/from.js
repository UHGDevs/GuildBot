module.exports = async (uhg, pmsg) => {

  console.log(`From ${pmsg.username} > ${pmsg.content}`)

  await uhg.dc.channels.botjs.send("From " + pmsg.username + ": " +pmsg.content)
}
