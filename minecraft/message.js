const fs = require('fs');
module.exports = async (uhg, packet) => {
  const pmsg = {}
  let message = JSON.parse(packet.message);
  if (message.extra) {
    let msgs = []
    for (let i=0; i<message.extra.length;i++) msgs.push(message.extra[i].text)

    pmsg.extra = uhg.func.clear(msgs.join("")) || null
    pmsg.non = msgs.join("") || null
  } else pmsg.extra = null

  if (message.text && pmsg.extra) pmsg.msg = uhg.func.clear(message.text) + pmsg.extra
  else pmsg.msg = pmsg.extra||uhg.func.clear(message.text)||null
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

  if (typeof pmsg.content != 'string') console.log("\n\n\nSTRING\n\n\n")
  if (typeof pmsg.content != 'string') pmsg.content = pmsg.content.join(" ")
  if (pmsg.msg.startsWith("You have joined ")&&pmsg.msg.endsWith(`'s party!`)) {
    let t = pmsg.msg.replace("You have joined ", "").split(" ")
    if (t[0].includes("[")) {
      pmsg.rank = t[0]
      pmsg.username = t[1].replace("'s", "")
    } else pmsg.username = t[0].replace("'s", "")
  } else if (pmsg.msg.startsWith("---") && pmsg.msg.includes("has invited you to join their party!")) {
    let t = pmsg.msg.replace(/-/g, "").substring(1).slpit(" ")
    if (t[0].includes("[")) {
      pmsg.rank = t[0]
      pmsg.username = t[1]
    } else pmsg.username = t[0]
  } else if (pmsg.msg.includes(" has requested to join the Guild!")) {
    t = pmsg.msg.split(" has requested to join the Guild!")[0].split(" ")
    pmsg.channel = "Officer"
    pmsg.command = "GjoininG"
    if (t[0].includes("[")) {
      pmsg.rank = t[0]
      pmsg.username = t[1]
    } else pmsg.username = t[0]
  }

  if (!pmsg.channel) return pmsg

  let data = uhg.data.guild || await uhg.mongo.get("stats", "guild")
  if (pmsg.username && data.length) {
    data = data.filter(uhg => uhg.name=="UltimateHypixelGuild")[0]
    for (let i=0;i<data.members.length;i++) {
      if (pmsg.username==data.members[i].name) {
        pmsg.uuid = data.members[i].uuid
        let verified = uhg.data.uhg || await uhg.mongo.get("general", "uhg")
        if (!verified.length) verified = await uhg.mongo.get("general", "uhg")
        verified = verified.filter(ver=>ver.username==pmsg.username)
        if (!verified.length) break
        verified = verified[0]
        pmsg.verify = true
        pmsg.grank = verified.guildrank
        pmsg.id = verified._id
      }
    }
  }

  if (pmsg.rank && pmsg.rank == "[MVP++]") pmsg.pluscolor = pmsg.non.split("++")[0].slice(-2)
  if (pmsg.rank && pmsg.rank == "[MVP+]") pmsg.pluscolor = pmsg.non.split("+")[0].slice(-2)

  if (pmsg.channel == "Guild" && pmsg.content.startsWith("!") || pmsg.channel=="Officer" && pmsg.content.startsWith("!")) {
    pmsg.command = pmsg.content.substring(1).split(" ")[0]
    pmsg.nickname = pmsg.content.split(" ")[1] || pmsg.username || null
    pmsg.args = pmsg.content.split(pmsg.command)
    pmsg.args.shift()
    pmsg.args = pmsg.args.filter(n=>!n.startsWith("["))
    pmsg.args = pmsg.args.join(pmsg.command).trim()
  }

  if (pmsg.channel == "From" && pmsg.verify) {
    if (pmsg.content.startsWith("!")) pmsg.command = pmsg.content.substring(1).split(" ")[0]
    else pmsg.command = pmsg.content.split(" ")[0]
    pmsg.nickname = pmsg.content.split(" ")[1] || pmsg.username || null
    pmsg.args = content.split(pmsg.command)
    pmsg.args.shift()
    pmsg.args = pmsg.args.join(pmsg.command).trim()
  }
  let events = fs.readdirSync(`minecraft/events/`).filter((file) => file.endsWith(".js"))
  events = events.filter(event => event.split(".")[0] == pmsg.channel.toLowerCase())
  if (events.length) return require(`./events/${events[0]}`)(uhg, pmsg)
  return require("./events/all")(uhg, pmsg)

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
