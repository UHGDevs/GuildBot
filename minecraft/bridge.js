exports.chat = async function (uhg, pmsg) {
  let msg = await pings(pmsg.content, uhg)
  await uhg.dc.channels.botjs.send(((getEmoji(uhg.dc.client, pmsg.rank||"", pmsg.pluscolor)) + " " + pmsg.username + ": " +msg).trim())
  return
}

exports.info = async function (uhg, pmsg) {
  let semoji = await getEmoji(uhg.dc.client, "server")
  let msg = pmsg.msg.replace(`${pmsg.channel} >`, semoji)
  await uhg.dc.channels.botjs.send(msg)
  return
}

exports.send = async function (uhg, msg) {
  let semoji = await getEmoji(uhg.dc.client, "server")
  await uhg.dc.channels.botjs.send(semoji + msg)
  return
}



async function pings(message, uhg) {
  let data = uhg.data.uhg
  if (!data.length) data = await uhg.mongo.get("general", "verify")
  let mentions = []
  let msg = message
  if (msg.includes("<@&")) msg = msg.replace(/<@&/gi, "")
  if (msg.includes("@")) for (let n=0; n<msg.split(" ").length;n++) if (msg.split(" ")[n].match(/@.*/)) mentions.push(msg.split(" ")[n].substring(1))
  mentions.forEach(men =>{
    console.log(men)
    console.log(men.toLowerCase())
    let user = data.filter(n=>n.nickname.toLowerCase() == men.toLowerCase())
    if (!user.length) return
    msg = msg.replace(`@${men}`, `<@${user[0]._id}>`)
  })
  // if (mentions.length) for (let m=0; m<mentions.length;m++) for (let i=0;i<data.length;i++) if (mentions[m] == data.members[i].username.toLowerCase()) msg = msg.replace(`@${mentions[m]}`, `<@${data.members[i].id}>`)
  return msg
}


function getEmoji(client, emoji, barva="c") {
  let emojis = []
  let em;
  let g = ""
  if (emoji == "server") {
    g = "_ _ _ _ _ _"
    em = ["server1", "server2", "server3", "server4", "server5"]
  }
  else if (emoji == "[MVP++]") {
    let color = barva.replace("§", "")
    em = ["gmvp1", "gmvp2", `gmvp_${color}_1`, `gmvp_${color}_2`]
    g = "_ _ _ _ _ _"
  }
  else if (emoji == "[MVP+]") {
    color = barva.replace("§", "")
    em = ["mvp1", "mvp2", "mvp3", `mvp_${color}`]
    g = "_ _"
  } else if (emoji == "[MVP]") {
    g = "_ _ _ _"
    em =  ["mvp1b", "mvp2b", "mvp3b"]
  } else if (emoji == "[VIP+]") {
    g = "_ _ _ _ _ _ _ _"
    em = ["vip1p", "vip2p", "vip3p"]
  } else if (emoji == "[VIP]") {
    g = "_ _ _ _"
    em = ["vip1", "vip2", "vip3"]
  } else if (emoji == "non") return "_ _ _ _ _ _"
  else if (emoji == "[YOUTUBE]") {
    //g = "_ _ _ _"
    em = ["yt1", "yt2", "yt3", "yt4", "yt5"]
  }
  else em = [emoji].filter(n=>n)
  for (let i=0;i<em.length;i++) {
    emojis.push(client.emojis.cache.find(emoji => emoji.name === em[i]))
  }

  return g+emojis.join("")
}
