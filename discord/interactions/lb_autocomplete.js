const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (uhg, interaction) => {
  let game = interaction.options.getString('minigame')
  if (!game) return

  let stat = interaction.options.getString('stat')

  let focused = interaction.options._hoistedOptions.filter(n => n.focused)[0]

  if (focused.name == 'stat') {
    if (game == 'bedwars') {
      return interaction.respond([
        { name: 'Level', value: 'level' },
        { name: 'Finální Zabití', value: 'finalKills' },
        { name: 'Finální Smrti', value: 'finalDeaths' },
        { name: 'FKDR', value: 'fkdr' },
        { name: 'Výhry', value: 'wins' },
        { name: 'Prohry', value: 'losses' },
        { name: 'WLR', value: 'wlr' },
        { name: 'WinStreak', value: 'winstreak' },
        { name: 'Hry', value: 'games' },
        { name: 'EXP', value: 'exp' },
        { name: 'Mince', value: 'coins' },
        { name: 'Zabití', value: 'kills' },
        { name: 'Smrti', value: 'deaths' },
        { name: 'KDR', value: 'kdr' },
        { name: 'Postele', value: 'beds' },
        { name: 'Ztracené Postele', value: 'bedsLost' },
        { name: 'BBLR', value: 'bblr' },
        { name: 'Sebrané Irony', value: 'iron' },
        { name: 'Sebrané Goldy', value: 'gold' },
        { name: 'Sebrané Diamanty', value: 'diamond' },
        { name: 'Sebrané Emeraldy', value: 'emerald' },
      ]);
    } else if (game == 'skywars') {
      return interaction.respond([
        { name: 'Level', value: 'level' },
        { name: 'Výhry', value: 'wins' },
        { name: 'Prohry', value: 'losses' },
        { name: 'WLR', value: 'wlr' },
        { name: 'Hry', value: 'games' },
        { name: 'Mince', value: 'coins' },
        { name: 'Zabití', value: 'kills' },
        { name: 'Smrti', value: 'deaths' },
        { name: 'KDR', value: 'kdr' },
        { name: 'Hlavy', value: 'heads' },
        { name: 'Opály', value: 'opals' },
        { name: 'Shardy', value: 'shards' },
        { name: 'Tokeny', value: 'tokens' },
        { name: 'Asistence', value: 'assists' }
      ])
    }
  } else if (focused.name == 'gamemode') {
    if (!stat) return
    if (game == 'bedwars') {
      if (stat == 'coins' || stat == 'exp' || stat == 'level') return interaction.respond([{ name: 'Celkové', value: 'overall' }])
      return interaction.respond([
        { name: 'Celkové', value: 'overall' },
        { name: 'Solo', value: 'solo' },
        { name: 'Doubles', value: 'doubles' },
        { name: '3v3v3v3', value: 'threes' },
        { name: '4v4v4v4', value: 'fours' },
        { name: '4v4', value: '4v4' }
      ]);
    } else if (game == 'skywars') {
      if (stat == 'coins' || stat == 'heads' || stat == 'level' || stat == 'opals' || stat == 'shards' || stat == 'tokens') return interaction.respond([{ name: 'Celkové', value: 'overall' }])
      return interaction.respond([
        { name: 'Celkové', value: 'overall' },
        { name: 'Solo Normal', value: 'solo_normal' },
        { name: 'Solo Insane', value: 'solo_insane' },
        { name: 'Doubles Normal', value: 'doubles_normal' },
        { name: 'Doubles Insane', value: 'doubles_insane' },
        { name: 'Rankedy', value: 'ranked' }
      ]);
    }

  }

}
