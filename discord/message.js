module.exports = async (uhg, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  uhg.mc.client.write("chat", { message: `AHOOJ`, position: 0 })
 await uhg.test.server.broadcast(`[MVP++] yesyes was kicked from the guild by [MVP+] officer!`);
}
