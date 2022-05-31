const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const commands = require('../../settings/values/commands')

module.exports = async (uhg, interaction) => {
  let command = interaction.options.getString('command')
  let focused = interaction.options._hoistedOptions.filter(n => n.focused)[0]

  let id = interaction.member.user.id
  let uhg_guild = uhg.dc.client.guilds.cache.get('455751845319802880')
  let guild_member = uhg_guild.members.cache.get(id)

  let respond = []

  if (focused.name == 'command') {

    if (uhg.data.uhg.filter(n => n._id == id).length) respond.push(commands.online)

    for (let role in uhg.cache.cmd_whitelist.roles) {
      if (( guild_member && guild_member._roles.includes(role)) || interaction.member._roles.includes(role)) {
        uhg.cache.cmd_whitelist.roles[role].forEach(a => {
          if (respond.filter(n => n.value === a).length) return
          respond.push(commands[a])
        });
      };
    }

    if (uhg.cache.cmd_whitelist.users[id]) {
      uhg.cache.cmd_whitelist.users[id].forEach(a => {
        if (respond.filter(n => n.value === a).length) return
        respond.push(commands[a])
      });
    }

    console.log(respond)

    if (!respond.length) respond.push(commands.notmember)
    return interaction.respond(respond)

  } else if (focused.name == 'player') {

  }

}
