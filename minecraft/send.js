exports.send = send
async function send(uhg, pmsg) {
  let message = pmsg.send;
  if (!message) return
  if (pmsg.count && pmsg.count > 2) return console.log("MOC POKUSŮ NA POSLÁNÍ ZPRÁVY")

  if (!pmsg.ready) {
    message = await pings(message, uhg)
    message = message.replace(/\*/g, "").trim()

    let channel = pmsg.channel || ""

    if (message.startsWith("/")) pmsg.ready = true
    if (channel.startsWith("/")) pmsg.ready = true
  }

  if (!pmsg.ready) {
    if (pmsg.channel == "Guild") message = "/gc " + message
    else if (pmsg.channel == "Officer") message = "/go " + message
    else if (pmsg.channel == "Party") message = "/pc " + message
    else if (pmsg.channel == "From") message = `/msg ${psmg.username} ` + message
    else {
      console.log(message)
      console.log(pmsg)
      console.log("NEED SOME WORK TO FINISH")
      return
    }
  }

  if (pmsg.error) {
    console.log(pmsg.error)
    console.log("ERROR HANDLERING COMMING SOON")
    return
    // ERROR HANDLERING HERE
    // (like you cannot send this message twice / you cannot message this player etc.)
  }

  pmsg.ready = true
  pmsg.send = message
  if (!pmsg.count) pmsg.count = 1
  else pmsg.count += 1

  uhg.mc.send.push(pmsg)
  console.log(uhg.mc.send)
  return
}

exports.write = async function (uhg, pmsg) {
  try {
    let msg = pmsg.send + (pmsg.antispam || "")

    uhg.mc.client.write("chat", { message: msg, position: 0 })

    client.on('chat', async function(packet) {
      let message = JSON.parse(packet.message)
      let text = clear(message.text)
      if (message.color == "red" && text.endsWith("!") && !text.includes("are a bannable")) pmsg.error = text
      return
    })
    await delay(500)
    if (!pmsg.error) return

    send(uhg, pmsg)
  } finally {return uhg.mc.ready = true}
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
