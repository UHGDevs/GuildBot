const { Collection } = require('discord.js');
module.exports = async (uhg) => {
  console.log(`Discord Bot is online! (${uhg.dc.client.user.tag})`.bold.brightGreen)
  uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });

  let guild = uhg.dc.client.guilds.cache.get("455751845319802880")
  if (!guild) return console.log("\nBot není na UHG dc\n".bgRed)

  let botSlashCmds = []
  uhg.dc.slash.forEach(cmd => { botSlashCmds.push({ name: cmd.name, description: cmd.description||"", options: cmd.options || [], permissions: cmd.permissions||[], type: cmd.type }) });
  await uhg.dc.client.guilds.cache.get("758650512827613195").commands.set(botSlashCmds)

  //let uhgSlashCmds = []
  //let commands = [uhg.dc.slash.find(n => n.name == "gexp"), uhg.dc.slash.find(n => n.name == "lb")]
  //commands.forEach(cmd => { uhgSlashCmds.push({ name: cmd.name, description: cmd.description||"", options: cmd.options || [], permissions: cmd.permissions||[], type: cmd.type }) });
  //await guild.commands.set(uhgSlashCmds)

  await uhg.dc.client.application.commands.set(botSlashCmds)

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
  uhg.dc.cache.channels.set("achat", uhg.dc.client.channels.cache.get("530496801782890527"))

  uhg.dc.cache.uhgroles = new Collection()
  //await guild.members.fetch()

  let vroles = ["478816107222925322", "530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063"]
  vroles.forEach(id => {
    let role = guild.roles.cache.get(id)
    let data = {name: role.name, id: role.id, color: role.color, role: role}
    uhg.dc.cache.uhgroles.set(role.name, data)
  });

  uhg.dc.cache.split = {}
  uhg.dc.cache.split.guild = ["530504032708460584", "537255964898754571", "530504766225383425", "537252847025127424", "475585340762226698", "530504567528620063", "656827910807879696", "807226875411431424", "977141028115058718", "916790046823161956"]
  uhg.dc.cache.split.discord = ["684069130478813226", "456149770847649802", "575052804960288770", "478598933908553730", "478816107222925322", "478811145034137611", "478809710997536768", "475588114732023818", "464872228995989515", "464872228996120617", "475594143448694787", "464872228819959819", "489790082585329669", "481101689550536714", "482898838722707466", "936257245178634261", "934449629800587325", "927992007157252136"]
  uhg.dc.cache.split.badges = []
  let minigames = ['SkyWars', 'Bedwars', /*'Blitz SG',*/ 'Duels', /*'Build Battle', 'CaC', */'Arena Brawl', 'Paintball', 'Quakecraft', 'The Walls', 'TKR', 'VampireZ', /*'UHC Champions'*/]
  uhg.dc.cache.badges = guild.roles.cache.filter(n => uhg.startsWithArray(n.name, minigames) || uhg.endsWithArray(n.name, minigames))
  uhg.dc.cache.badges.forEach(n => {uhg.dc.cache.split.badges.push(n.id)});

  let skyblock = ['Skill Avarage', 'Catacombs', 'Slayer Average', 'Networth', 'Weight)']
  uhg.dc.cache.badges_sb = guild.roles.cache.filter(n => uhg.startsWithArray(n.name, skyblock) || uhg.endsWithArray(n.name, skyblock))
  uhg.dc.cache.split.badges_sb = []
  uhg.dc.cache.badges_sb.forEach(n => {uhg.dc.cache.split.badges_sb.push(n.id)});


  uhg.dc.cache.splits = new Collection()

  let guild_split = guild.roles.cache.get('973907328942358558')
  uhg.dc.cache.splits.set('guild', {name: guild_split.name, id: guild_split.id, color: guild_split.color, role: guild_split})

  let discord_split = guild.roles.cache.get('973907442842861620')
  uhg.dc.cache.splits.set('discord', {name: discord_split.name, id: discord_split.id, color: discord_split.color, role: discord_split})

  let badges_split = guild.roles.cache.get('927943516305387590')
  uhg.dc.cache.splits.set('badges', {name: badges_split.name, id: badges_split.id, color: badges_split.color, role: badges_split})

  let badges_sb_split = guild.roles.cache.get('973948440881025034')
  uhg.dc.cache.splits.set('badges_sb', {name: badges_sb_split.name, id: badges_sb_split.id, color: badges_sb_split.color, role: badges_sb_split})
}
