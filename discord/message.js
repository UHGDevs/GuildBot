module.exports = async (uhg, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();

  if (!message.content.startsWith(".")) return
  let content = message.content.replace(".", "")

  if (content = "gchat") await uhg.test.server.broadcast(`§2Guild > §a[VIP§6+§a] The_AntiFrost_SK&f: necham drakov`);
  if (content = "pchat") await uhg.test.server.broadcast(`§2Party > §a[VIP§6+§a] The_AntiFrost_SK&f: necham drakov`);
}
