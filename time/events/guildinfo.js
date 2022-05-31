const guildrefresh = require('../../utils/guildrefresh');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "guildinfo",
  description: "Informace o guildě",
  time: '0 */2 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,1,2,3,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: true,
  run: async (uhg) => {
    let date = new Date()
    try {
      let names = false
      if (date.getHours() == 4 && date.getMinutes() == 2) names = true

      let puhg = guildrefresh(uhg, 'UltimateHypixelGuild', names)
      let tkjk = guildrefresh(uhg, 'tkjk', names)
      if (names || date.getHours() == 20 && date.getMinutes() == 10) guildrefresh(uhg, 'czsk', names)
      let results = await Promise.all([puhg, tkjk])
      puhg = results[0]
      tkjk = results[1]

      let gmembers_channel = uhg.dc.client.channels.cache.get("811865691908603904");
      let uhglevel_channel = uhg.dc.client.channels.cache.get("825659339028955196");
      let tkjklevel_channel = uhg.dc.client.channels.cache.get("928569528676392980");
      let rozdil_channel = uhg.dc.client.channels.cache.get("928671490436648980");

      let mCount = Number(gmembers_channel.name.replace('Members: ', '').split('/')[0])
      if (mCount !== 125 && puhg.data.members.length === 125) {
        let kick_channel = uhg.dc.client.channels.cache.get("530496801782890527");

        let updated = await guildrefresh(uhg, 'UltimateHypixelGuild')
        if (typeof updated !== 'object') return

        let api = updated.api
        let data = updated.data

        let mesic = Object.keys(data.members[0].exp.daily).slice(0,30)

        let msgfrag = []
        let sort = []

        for (let member of data.members) {
          for (let gmember of api.members) {
            if (member.uuid == gmember.uuid && !gmember.rank.includes("Member")) break;
            if (member.uuid != gmember.uuid) continue;
            if (Number(date) - member.joined < 604800000) break;

            let mxp = 0
            for (let t=0;t<mesic.length;t++) {
              let xp = member.exp.daily[mesic[t]] || 0
              mxp += xp
            }
            sort.push({nickname:member.name, exp:mxp, uuid: member.uuid, joined: member.joined})
          }
        }


        let sorted = sort.sort(function(a, b){ return a.exp - b.exp }).slice(0,10)

        for(let b=0; b<sorted.length; b++) {
          msgfrag.push(`\`•\` **${sorted[b].nickname}** - ${uhg.f(sorted[b].exp)}`)
        }

        let embed = new MessageEmbed().setTitle(`unELITE MEMBERS`).setDescription(`**Nejméně GEXP za 30 dní:**\n\n${msgfrag.join("\n")}`).setFooter('Jen guild membeři, kteří jsou v guildě více jak 7 dní')
        kick_channel.send({ embeds: [embed] })
      }

      let uhglvl = uhg.getGuildLevel(puhg.data.totalxp)
      let tkjklvl = uhg.getGuildLevel(tkjk.data.totalxp)
      let rozdil = Math.abs(tkjklvl-uhglvl)

      let gmembers_message = `Members: ${puhg.data.members.length}/125`;
      let uhglevel_message = `Guild Level: ${Math.round(uhglvl*100)/100}`;
      let tkjklevel_message = `TKJK: ${Math.round(tkjklvl*100)/100}`;
      let rozdil_message = `Rozdíl: ${Math.round(rozdil*10000)/10000}`;

      try {
        if (gmembers_channel.name !== gmembers_message) await gmembers_channel.setName(gmembers_message)
        if (uhglevel_channel.name !== uhglevel_message) await uhglevel_channel.setName(uhglevel_message)
        if (tkjklevel_channel.name !== tkjklevel_message) await tkjklevel_channel.setName(tkjklevel_message)
        if (rozdil_channel.name !== rozdil_message) await rozdil_channel.setName(rozdil_message)
      } catch (e) {
        console.log(e)
        console.log('Chyba v time/events/guildinfo.js:38 - nenalezen kanál')
      }

      let today = Object.keys(puhg.api.members[0].expHistory)[0]
      let yesterday = Object.keys(puhg.api.members[0].expHistory)[1]

      let uhglvl_1 = uhg.getGuildLevel(puhg.data.tdailyxp[yesterday] || 0)
      let tkjklvl_1 = uhg.getGuildLevel(tkjk.data.tdailyxp[yesterday] || 0)

      let rozdil1 = Math.abs(tkjklvl_1 - uhglvl_1)

      let sent = true
      let send = date.getHours() == 5 && date.getMinutes() == 58

      if (send) {
        let channel = uhg.dc.client.channels.cache.get("933036082541498408");

        let emoji = " 🟩 +"
        if (String(rozdil1-rozdil).startsWith("-")) emoji = " 🟥 -"

        let perday = emoji + Math.round(Math.abs(rozdil-rozdil1)*10000)/10000

        let emsend = new MessageEmbed()
            .setTitle(`UHG vs TKJK`)
            .setColor(16109582)
            .addField("UHG", `Level: ${Math.round(uhglvl*10000)/10000}`, true)
            .addField("TKJK", `Level: ${Math.round(tkjklvl*10000)/10000}`, true)
            .addField("Rozdíl:", `Celkový: ${Math.round(rozdil*10000)/10000}\nDen:${perday}`, false);
        channel.send({ embeds: [emsend] })
      }
      return
    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v guild informacích!"
    }
  }
}
