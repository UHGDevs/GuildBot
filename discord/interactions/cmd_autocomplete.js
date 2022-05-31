const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const commands = require('../../settings/values/commands')

module.exports = async (uhg, interaction) => {
  let command = interaction.options.getString('command')
  let focused = interaction.options._hoistedOptions.filter(n => n.focused)[0]

  let respond = []

  if (focused.name == 'command') {
    console.log(interaction.member.user.id)
    console.log(commands)

    respond.push(commands.mute)

    return interaction.respond(respond)

  } else if (focused.name == 'player') {

  }

}
