const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');

const buttons = new MessageActionRow()
  .addComponents(new MessageButton().setCustomId('LBFirst').setStyle('PRIMARY').setEmoji('⏮'))
  .addComponents(new MessageButton().setCustomId('LBBack').setStyle('PRIMARY').setEmoji('◀'))
  .addComponents(new MessageButton().setCustomId('LBNext').setStyle('PRIMARY').setEmoji('▶'))
  .addComponents(new MessageButton().setCustomId('LBLast').setStyle('PRIMARY').setEmoji('⏭'));
const guildrefresh = require('../../utils/guildrefresh');
module.exports = {
  name: 'lb',
  description: 'testing command',
  options: [
    {
      name: "minigame",
      description: "Vyber si minihru",
      type: "STRING",
      required: true,
      choices: [
        {
          name: 'bedwars',
          value: 'bedwars',
        },
        {
          name: 'skywars',
          value: 'skywars',
        }
      ]
    },
    {
      name: 'stat',
      description: 'Vyber si stat, který chceš vidět',
      type: 'STRING',
      required: false,
      autocomplete: true
    },
    {
      name: 'gamemode',
      description: 'Vyber si gamemode, který chceš vidět',
      type: 'STRING',
      required: false,
      autocomplete: true
    }
  ],
  run: async (uhg, interaction, args) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {
      Array.prototype.chunk = uhg.chunk
      let game = interaction.options.getString('minigame')
      let stat = interaction.options.getString('stat') || 'level'
      let gamemode = interaction.options.getString('gamemode') || 'overall'

      let data = uhg.data.stats || await uhg.mongo.run.get("stats", "stats")

      let lb = { players: [], send: [] }
      data.forEach(player => {
        let gamemode_api = player.stats[game][gamemode]  || player.stats[game]
        if (game == 'general') gamemode_api = player
        let stats = gamemode_api[stat]
        //let stats2 = gamemode_api[stat+'formatted']
        if (!stats && stats !== 0) stats = player.stats[game][stat]
      //  if (!stats && stats !== 0) stats2 = player.stats[game][stat+'formatted']
        lb.players.push({ username: player.username, stat: stats })
      });

      lb.players.sort((a, b) => b.stat - a.stat).forEach((a, i) => { lb.send.push(`\`#${i+1}\` **${a.username}:** \`${uhg.f(a.stat)}\``) });
      lb.send = lb.send.chunk(20)

      let title = `CZSK ${uhg.renameHypixelGames(game)} ${gamemode} ${stat} leaderboard`

      let embeds = []
      lb.send.forEach((a, i)=>{
        let value = a.join("\n")
        let embed = new MessageEmbed()
          .setDescription('ㅤ')
          .setColor(5592575)
          .setFooter({ text: `${i+1}/${lb.send.length}` })
          .setTitle(title)
          .addField('ㅤ', value, false);
        embeds.push(embed)
      })

      let cache = JSON.parse(fs.readFileSync('settings/cache/lb.json', 'utf8'));
      cache[title] = embeds
      await fs.writeFile('settings/cache/lb.json', JSON.stringify(cache, null, 4), 'utf8', data =>{})

      await interaction.editReply({ embeds: [embeds[0]], components: [buttons] })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v lb příkazu!'
    }
  }
}
