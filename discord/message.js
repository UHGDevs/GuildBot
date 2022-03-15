module.exports = async (uhg, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();

  let prefix = uhg.settings.prefix || "."

  if (!message.content.startsWith(prefix)) return
  let content = message.content.replace(prefix, "")

  let command = uhg.dc.commands.get(content.split(" ")[0]);
  if (!command) command = uhg.dc.commands.get(content.split(" ")[0].toLowerCase());
  if (!command) command = uhg.dc.commands.get(uhg.dc.aliases.get(content.split(" ")[0].toLowerCase()));
  if (!command) command = uhg.mc.commands.get(uhg.mc.aliases.get(content.split(" ")[0].toLowerCase()));
  if (command) {
    let msg = await command.run(uhg, {nickname:content.split(" ")[1]||"DavidCzPdy"}) || "nic"
    return await uhg.dc.channels.botjs.send(msg)
  } //else return message.reply("Neplatný command")



  if (content == "cmd") await uhg.test.server.broadcast(`§2Guild > §b[MVP§8+§b] Farmans §e[Gnrl]§f: !level Honzu`)
  if (content == "gchat") await uhg.test.server.broadcast(`§2Guild > §a[VIP§6+§a] The_AntiFrost_SK§f [Elite]: necham drakov`);
  if (content == "pchat") await uhg.test.server.broadcast(`§2Party > §a[VIP§6+§a] AntreX95§f: necham drakov`);
  if (content == "msg") await uhg.test.server.broadcast(`From §6[MVP§9+§6] Farmans: !online Honzu`)
  if (content == "join") await uhg.test.server.broadcast(`§2Guild >  Farmans joined.`)
  if (content == "gjoin") await uhg.test.server.broadcast(`§b[MVP§8+§b] Technoblade§f has requested to join the Guild!`)
  if (content.split(" ")[0] == "c") await uhg.test.server.broadcast(`§2Guild > §b[MVP§8+§b] Farmans §e[Gnrl]§f: !${content.split(" ")[1]} Honzu`)
  if (content == "r") require("../minecraft/commands.js") (uhg)
}
