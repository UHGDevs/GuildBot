const guildrefresh = require('../../utils/guildrefresh');
const send = require('../../minecraft/send').send;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "elites",
  description: "Automatičští elite members",
  time: '0 0 17 * * 0', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: false,
  run: async (uhg) => {
    let now = Number(new Date())
    try {
      let api, data

      let updated = await guildrefresh(uhg, 'UltimateHypixelGuild')
      if (typeof updated !== 'object') {
        api = await uhg.getApi("64680ee95aeb48ce80eb7aa8626016c7", ["guild"])
        if (api instanceof Object == false) return
        api = api.guild.all
        data = await uhg.mongo.run.get('stats', 'guild', {name:"UltimateHypixelGuild"})
        if (!data.length) return
        data = data[0]
      } else {
        api = updated.api
        data = updated.data
      }

      let tyden = Object.keys(data.members[0].exp.daily).slice(0,7)

      let msgfrag = []
      let sort = []
      let uuids = []

      for (let member of data.members) {
        for (let gmember of api.members) {
          if (member.uuid == gmember.uuid && !gmember.rank.includes("Member"||"Elite Member")) break;
          if (member.uuid != gmember.uuid) continue;
          //if (gmember.uuid == "0f7e51d0ce9b434ea9f49166051efa32") break
          let txp = 0
          for (let t=0;t<tyden.length;t++) {
            let xp = member.exp.daily[tyden[t]] || 0
            txp += xp
          }
          sort.push({nickname:member.name, exp:txp, uuid: member.uuid})
        }
      }


      let sorted = sort.sort(function(a, b){ return b.exp - a.exp }).slice(0,10)

      for(let b=0; b<sorted.length; b++) {
        msgfrag.push(`\`•\` **${sorted[b].nickname}** - ${uhg.f(sorted[b].exp)}`)
        uuids.push(sorted[b].uuid)
      }

      let embed = new MessageEmbed().setTitle(`ELITE MEMBERS`).setDescription(`**Elite Members na další týden:**\n\n${msgfrag.join("\n")}`)
      let channel = await uhg.dc.client.channels.cache.get('715989905532256346')
      channel.send({ embeds: [embed] })

      let elites = []
      for (let g=0; g<api.members.length; g++) {
        let gmember = api.members[g]
        if (gmember.rank == "Elite Member") elites.push(gmember.uuid)
      }

      let add = []
      for (let a=0; a<uuids.length; a++) {
        if (elites.includes(uuids[a])) continue;
        add.push(uuids[a])
      }

      let remove = []
      for (let r=0; r<elites.length; r++) {
        if (uuids.includes(elites[r])) continue;
        remove.push(elites[r])
      }

      let error = []
      let msgs = []
      for (let i=0; i<add.length; i++) {
        let mjg = await uhg.getApi(add[i], ["mojang"])
        let msg = `/g promote ${mjg.username}`
        msgs.push(msg)
        send(uhg, {send:msg})
        await uhg.delay(600)
      }

      for (let i=0; i<remove.length; i++) {
        let mjg = await uhg.getApi(remove[i], ["mojang"])
        let msg = `/g demote ${mjg.username}`
        msgs.push(msg)
        send(uhg, {send:msg})
        await uhg.delay(600)
      }

      let embed2 = new MessageEmbed().setTitle('NEJSEM ONLINE').setDescription(`BOT není online na serveru, nastavte Elite Members za mě\n\n*${msgs.join("\n")}*`)
      let channel2 = await uhg.dc.client.channels.cache.get('530496801782890527')
      channel2.send({ embeds: [embed2] })


    return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v ELITES!"
    }
  }
}
