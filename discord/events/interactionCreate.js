const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fs = require('fs');

module.exports = async (uhg, interaction) => {
  if (interaction.isCommand()) require('../interactions/slashcommands')(uhg, interaction)
  else if (interaction.isButton() && (interaction.customId.startsWith('/g ') || interaction.customId == 'guild_denine')) require('../interactions/guild_command')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('GEXP') ) require('../interactions/gexp')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('LB') ) require('../interactions/lb')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('LOOT') ) require('../interactions/loot')(uhg, interaction)
  else if (interaction.isAutocomplete() && interaction.commandName == 'lb') require('../interactions/lb_autocomplete')(uhg, interaction)
  else if (interaction.isAutocomplete() && interaction.commandName == 'cmd') require('../interactions/cmd_autocomplete')(uhg, interaction)
  else if (interaction.isAutocomplete() && interaction.commandName == 'loot') require('../interactions/loot_autocomplete')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('uhg_rules_')) require('../interactions/uhg_rules')(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('create_modal_')) require(`../interactions/modal/${fs.readdirSync(`discord/interactions/modal`).filter(n => n == interaction.customId.split('_')[2]+'.js')[0]}`).send(uhg, interaction)
  else if (interaction.isModalSubmit() ) require(`../interactions/modal/${fs.readdirSync(`discord/interactions/modal`).filter(n => n == interaction.customId.split('_')[2]+'.js')[0]}`).get(uhg, interaction)
  else if (interaction.isButton() && interaction.customId.startsWith('VERLANG')) require(`../interactions/verlang`)(uhg, interaction)
  
}
