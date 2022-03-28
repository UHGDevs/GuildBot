let bridge = require(`../bridge.js`)
let chat = require(`../send.js`)
module.exports = async (uhg, pmsg) => {
  let finder = pmsg.msg.match(/^Guild > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (někdo|nekdo|someone|any|[0-9]\/[0-9]|[0-9])? (\w{2,10})?(.*)$/)
  if (finder) guildfinder(uhg, pmsg, finder)
  if (pmsg.msg.match(/^Guild > (\[.*]\s*)?([\w]{2,17}).*?(\[.{1,15}])?: (.*)$/)) await bridge.chat(uhg, pmsg)
  else await bridge.info(uhg, pmsg)

  if (!pmsg.command) return
  let command = uhg.mc.commands.get(pmsg.command)
  if(!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(pmsg.command.toLowerCase()));
  let res = "Neznámý command"
  if (command) res = await command.run(uhg, pmsg);


  pmsg.send = res
  await bridge.send(uhg, pmsg.send) //await uhg.dc.channels.botjs.send(pmsg.command + " - command comming soon")

  await chat.send(uhg, pmsg)
}

async function guildfinder(uhg, pmsg, finder) {
  let user = await uhg.mongo.run.get("general", "guildfind", {_id: pmsg.username}) || {}
  if (user) user = user[0]
  let games = user.games || [];
  let messages = user.messages || [];

  games.push(finder[5])
  messages.push(pmsg.content)
  uhg.mongo.run.post("general", "guildfind", {_id: pmsg.username, discord: pmsg.id, games: games, messages: messages, updated: Number(new Date())})
}
