const { Collection } = require('discord.js');
module.exports = async (uhg) => {
  console.log(`Discord Bot is online! (${uhg.dc.client.user.tag})`.bold.brightGreen)
  uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });
  uhg.dc.channels = {}
  uhg.dc.channels.gchat = await uhg.dc.client.channels.cache.get(uhg.dc.channelsids.guild)
  uhg.dc.channels.ochat = await uhg.dc.client.channels.cache.get(uhg.dc.channelsids.officer)
  uhg.dc.channels.botjs = await uhg.dc.client.channels.cache.get("875503798733385779")
  await uhg.func.delay(500)

  uhg.dc.cache.uhgroles = new Collection()

  let guild = uhg.dc.client.guilds.cache.get("455751845319802880")
  if (!guild) return console.log("\nBot není na UHG dc\n".bgRed)

  let roles = ["478816107222925322", "530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063"]
  roles.forEach(id => {
    let role = guild.roles.cache.get(id)
    let data = {name: role.name, id: role.id, color: role.color, role: role}
    uhg.dc.cache.uhgroles.set(role.name, data)
  });


}
