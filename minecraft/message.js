module.exports = async (uhg, packet) => {
  const pmsg = {}
  let message = JSON.parse(packet.message);
  if (message.extra) {
    let msgs = []
    for (let i=0; i<message.extra.length;i++) msgs.push(message.extra[i].text)
    
    pmsg.extra = uhg.clear(msgs.join("")) || null
    pmsg.non = msgs.join("") || null
  } else pmsg.extra = null

  if (message.text && pmsg.extra) pmsg.msg = uhg.clear(message.text) + pmsg.extra
  else pmsg.msg = pmsg.extra||uhg.clear(message.text)||null
  if (!pmsg.msg) return { msg: false }
  if (pmsg.msg.startsWith("-")) pmsg.msg = pmsg.msg.replace(/-/g, "").trim()
  pmsg.msg = pmsg.msg.replace(/\s+/g, ' ').trim()
  console.log(pmsg.msg)


  /*let a = {
    msg: msg || null,
    non: non || null,
    username: username || null,
    nickname: nickname || username || null,
    content: content || "",
    channel: channel || "All",
    command: command || null,
    args: args || null,
    rank: rank || null,
    pluscolor: pluscolor || "",
    verify: verify || false,
    grank: grank || "NON Member",
    uuid: uuid || null,
    id: id || null,
    data: data || {}
  }*/
}
