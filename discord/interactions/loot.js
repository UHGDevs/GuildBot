const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (uhg, interaction) => {
  let type = interaction.customId.split('_')[1]
  await interaction.update({ type:6, ephemeral: true })

  let msg;
  if (type == 'box');
  else if (type == 'inventory');
  if (type == 'key') msg = uhg.loot.data.keys


  if (!msg) return interaction.followUp({ content: 'fatal error LOL', ephemeral: true })
  interaction.followUp(msg)
}
