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
  
  //["Guild", ">", "jmenonnona:", "zprava"]
  let content = pmsg.msg.split(" ")

  let again = true;
  for (let a=0; a<7; a++) {
    if (!Array.isArray(content)) break
    else if (!content.length) content = pmsg.msg 
    else if (content[0] == "UHGuild") content.shift()
    else if (content[0].match(/To|Guild|From|Party|Officer/) && content[1] && content[1].startsWith(">") && content[2] && !content[2].startsWith("[") && !content[2].endsWith("]") && again == true) {
      //if the guild member is non
      if (content.length > 1) content.splice(0, 0, content.splice(2, 1)[0]);
      pmsg.username = content[0].replace(":", "")
      content.shift()
      again = false;
    }
    else if (content[0].match(/To|Guild|From|Party|Officer/)) { pmsg.channel=content[0]
      content.shift()}
    else if (content[0].startsWith(">")) content.shift()
    else if (a<4 && content[0].startsWith("[") && content[0].endsWith("]")) {
      pmsg.rank = content[0]
      content.shift()
      pmsg.username = content[0].replace(":", "")
    }
    else if (content[0].startsWith("[") && content[0].endsWith(":")) {
      content.shift()
    }
    else if (content[0] == "Name:" && content[1] == "UltimateHypixelGuild") {
      content[0].replace(":", "")
      content.shift()
    }
    else if (a < 7 && content[0].endsWith(pmsg.username + ":") || a < 7 && content.length > 1 && content[1].startsWith("[") && content[1].endsWith("]:")) { /*username = content[0].replace(":", "")*/
    content.shift()}
    else if (a < 3 && (content[1]=="joined"||content[1]=="joined."||content[1]=="left."||pmsg.msg.includes("was kicked from the guild by") || pmsg.msg.includes("has requested to join the Guild!"))) { pmsg.username = content[0]
    content.shift()}
    else {
      content = content.join(" ")
      break
      }
  }
  pmsg.content = content
  console.log(pmsg.content)

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