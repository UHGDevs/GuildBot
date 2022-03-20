exports.send = async function (uhg, pmsg) {
  let ready;
  let message = pmsg.send;
  if (!message) return
  message = pings(message, uhg)
  message = message.replace(/\*/g, "")

  let channel = pmsg.channel || ""

  if (message.startsWith("/")) ready = true
  if (channel.startsWith("/")) ready = true
  return
}



async function pings(message, uhg) {
  let data = uhg.data.uhg
  if (!data.length) data = await uhg.mongo.get("general", "verify")

  let msg = message
  let ids = msg.match(/<@.?[0-9]*?>/g)
  if (!ids) return message
  ids.forEach(men => {
    let name;
    let indi;
    if (men.includes("!")) indi = "user"
    else if (men.includes("&")) indi = "role"
    if (!indi) return
    let id = men.replace(/\D/g, "")
    try {
      if (indi == "user") name = data.filter(n=>n._id==id)[0] ? data.filter(n=>n._id==id)[0].nickname||{}:men
      if (indi == "role") name = uhg.dc.client.guilds.cache.get("758650512827613195").roles.cache.get(id).name||men
    } catch (e) {name = men}
    msg = msg.replace(men, `@${name}`)
  });
  return msg
}
