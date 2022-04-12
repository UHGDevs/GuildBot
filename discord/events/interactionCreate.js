const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (uhg, interaction) => {
  if (interaction.isCommand()) require('../interactions/slashcommands')(uhg, interaction)
  else if (interaction.isButton() && (interaction.customId.startsWith('/g ') || interaction.customId == 'guild_denine')) require('../interactions/guild_command')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('GEXP') ) require('../interactions/gexp')(uhg, interaction)
    else if (interaction.isButton() && interaction.customId.startsWith('LB') ) require('../interactions/lb')(uhg, interaction)
  else if (interaction.isAutocomplete() && interaction.commandName == 'lb') require('../interactions/lb_autocomplete')(uhg, interaction)

}
