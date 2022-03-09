module.exports = async (uhg, packet) => {
  console.log(packet)
  let message = JSON.parse(packet.message);
  if (message.extra) {
    let msgs = []
    for (let i=0; i<message.extra.length;i++) msgs.push(message.extra[i].text)
    
    extra = clear(msgs.join("")) || null
    non = msgs.join("") || null
  } else extra = null

  if (message.text && extra) msg = clear(message.text) + extra
  else msg = extra||clear(message.text)||null
  if (!msg) return { msg: false }
}
