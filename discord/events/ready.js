const { Collection } = require('discord.js');
module.exports = async (uhg) => {
  console.log(`Discord Bot is online! (${uhg.dc.client.user.tag})`.bold.brightGreen)
  uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });

  let guild = uhg.dc.client.guilds.cache.get("455751845319802880")
  if (!guild) return console.log("\nBot není na UHG dc\n".bgRed)

  uhg.dc.cache.channels = new Collection()
  if (uhg.settings.minecraft === true) {
    uhg.dc.cache.channels.set("guild", uhg.dc.client.channels.cache.get(uhg.getDiscordIds().channels.guild))
    uhg.dc.cache.channels.set("officer", uhg.dc.client.channels.cache.get(uhg.getDiscordIds().channels.officer))
  }
  else {
    uhg.dc.cache.channels.set("guild", uhg.dc.client.channels.cache.get(uhg.getDiscordIds().channels.botguild))
    uhg.dc.cache.channels.set("officer", uhg.dc.client.channels.cache.get(uhg.getDiscordIds().channels.botofficer))
  }
  uhg.dc.cache.channels.set("bot", uhg.dc.client.channels.cache.get("875503798733385779"))

  uhg.dc.cache.uhgroles = new Collection()
  //await guild.members.fetch()

  let roles = ["478816107222925322", "530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063"]
  roles.forEach(id => {
    let role = guild.roles.cache.get(id)
    let data = {name: role.name, id: role.id, color: role.color, role: role}
    uhg.dc.cache.uhgroles.set(role.name, data)
  });


}
