module.exports = async (uhg, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();

  let prefix = uhg.settings.prefix || "."
  let mcchat = Object.values(uhg.dc.channelsids).includes(message.channel.id)

  if (!message.content.startsWith(prefix) && !mcchat) return
  if (mcchat) require("./bridge.js")(uhg, message);

  let content;
  if (message.content.trim().startsWith(prefix)) content = message.content.trim().replace(prefix, "").trim()
  else if (message.content.trim().startsWith("!") && mcchat) content = message.content.trim().replace("!", "").trim()
  if (!content) return

  if (content.startsWith("test")) return require("../time/events/database.js").run(uhg)

  let command = uhg.dc.commands.get(content.split(" ")[0]);
  if (!command) command = uhg.dc.commands.get(content.split(" ")[0].toLowerCase());
  if (!command) command = uhg.dc.commands.get(uhg.dc.aliases.get(content.split(" ")[0].toLowerCase()));
  if (command) {
    let msg = await command.run(uhg, message, content.replace(content.split(" ")[0], "").trim())
    return await message.channel.send(msg)
  }

  if (!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(content.split(" ")[0].toLowerCase()));
  if (command) {
    let msg = await command.run(uhg, {username: uhg.data.verify.filter(n=>n._id==message.author.id)[0].nickname||content.split(" ")[0], args:content.toLowerCase().replace(content.split(" ")[0].toLowerCase(), "").trim()||"", nickname:content.split(" ")[1]||uhg.data.verify.filter(n=>n._id==message.author.id)[0].nickname||"KOkasfneplatne"}) || "error v posilani mc commandu z discordu"
    if (mcchat) {
      let mcchannel = "/go "
      if (message.channel.id == uhg.dc.channelsids.guild) mcchannel = "/gc "
      require("../minecraft/send").send(uhg, {send: mcchannel+msg})
    }
    return await message.reply(msg)
  }



  if (uhg.test.server){
    if (content == "gcmd") await uhg.test.server.broadcast(`§2Guild > §b[MVP§8+§b] Farmans §e[Gnrl]§f: !level Honzu`)
    if (content == "gchat") await uhg.test.server.broadcast(`§2Guild > §a[VIP§6+§a] The_AntiFrost_SK§f [Elite]: necham drakov`);
    if (content == "pchat") await uhg.test.server.broadcast(`§2Party > §a[VIP§6+§a] AntreX95§f: necham drakov`);
    if (content == "msg") await uhg.test.server.broadcast(`From §6[MVP§9+§6] Farmans: !online Honzu`)
    if (content == "join") await uhg.test.server.broadcast(`§2Guild >  Farmans joined.`)
    if (content == "gjoin") await uhg.test.server.broadcast(`§b[MVP§8+§b] Technoblade§f has requested to join the Guild!`)
    if (content.split(" ")[0] == "c") await uhg.test.server.broadcast(`§2Guild > §b[MVP§8+§b] Farmans §e[Gnrl]§f: !${content.split(" ")[1]} Honzu`)
    if (content == "r") require("../minecraft/commands.js") (uhg)
  }
}
