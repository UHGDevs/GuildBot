const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (uhg, interaction) => {
  await interaction.update({ type:6, ephemeral: true })
  let type = interaction.values[0]


  return interaction.followUp({ content: `Ahoj, ${[interaction.values[0]]} info`, ephemeral: true })
}
