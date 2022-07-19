const refresh = require('../../utils/serverroles.js')
const time = require('../../utils/timehandler.js')

const eventName = module.filename.split('/').filter(n => n.endsWith('.js'))[0].split('.')[0]

module.exports = {
  name: eventName,
  description: "Automatická aktualizace rolí na UHG discordu",
  emoji: '🌙',
  time: '30 */5 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: true,
  run: async (uhg) => {
    let date = new Date()
    let event = time.start(uhg, eventName)
    try {
      let dVerify = await uhg.mongo.run.get("general", "verify")
      uhg.data.verify = dVerify
      let dUhg = await uhg.mongo.run.get("general", "uhg")
      let membersData = await uhg.mongo.run.get("stats", "stats")
      uhg.data.stats = membersData

      if (date.getHours() == 3 && date.getMinutes() == 0) {
        for (let verified of dVerify) {
          console.log(verified)
          let api = await uhg.getApi(verified.uuid, ['hypixel'])
          if (api instanceof Object == false) continue
          if (api.username !== verified.nickname) uhg.mongo.run.update("general", "verify", {_id:verified._id, nickname: api.username, names: api.hypixel.nicks })
          await uhg.delay(700)
        }
        dVerify = await uhg.mongo.run.get("general", "verify")
        uhg.data.verify = dVerify
      }
      

      let api = await uhg.getApi("64680ee95aeb48ce80eb7aa8626016c7", ["guild"])
      if (api instanceof Object == false) return console.log(api)

      let members = api.guild.all.members

      let unUuid = []
      let allUuids = []


      /* mongo UHG coordinate */
      for (let member of members) {
        allUuids.push(member.uuid);
        let vMember = dVerify.filter(n => n.uuid == member.uuid)
        let uMember = dUhg.filter(n => n.uuid == member.uuid)

        if (!vMember.length) unUuid.push(member.uuid);
        else if (!uMember.length) uhg.mongo.run.post("general", "uhg", {_id:vMember[0]._id, username:vMember[0].nickname, uuid: vMember[0].uuid, guildrank: member.rank })
        else if (uMember[0].guildrank != member.rank) uhg.mongo.run.update("general", "uhg", {_id:uMember[0]._id, guildrank: member.rank })
        else if (uMember[0].username != vMember[0].nickname) uhg.mongo.run.update("general", "uhg", {_id:uMember[0]._id, username: vMember[0].nickname })
      }
      dUhg.filter(n => !allUuids.includes(n.uuid)).forEach(notuhg => { uhg.mongo.run.delete("general", "uhg", {_id: notuhg._id})});

      /* get UNVERIFIED members */
      unNames = []
      for (let uuid of unUuid) {
        let autoverify = false
        let uApi = await uhg.getApi(uuid, ["mojang", "hypixel", "guild"])
        if (uApi instanceof Object == false) {unNames.push({name:uuid}); continue;}
        let joined = Math.floor((new Date().getTime()-uApi.guild.member.joined)/ 86400000)
        if (uApi.hypixel.links.DISCORD) {
          let discord = uhg.dc.client.users.cache.find(n => `${n.username}#${n.discriminator}` == uApi.hypixel.links.DISCORD)
          if (discord) {
            await uhg.mongo.run.post("general", "verify", { _id: discord.id, uuid: uApi.uuid, nickname: uApi.username, updated: Number(new Date()) })
            autoverify = true
            uhg.dc.cache.channels.get('achat').send(`Autoverified ${uApi.username} - <@${discord.id}> (${uApi.hypixel.links.DISCORD})`)
          }
        }
        unNames.push( {name:uApi.username, joined: joined, date: `<t:${Math.round(uApi.guild.member.joined/1000)}:R>`, lastLogin: uApi.hypixel.lastLogin, lastOnline: `<t:${Math.round(uApi.hypixel.lastLogin/1000)}:R>`, links: uApi.hypixel.links, autoverify: autoverify} )
      }
      uhg.data.unverified = unNames

      /* get UPDATE names of members */
      if (date.getHours() === 2 && date.getMinutes() === 0) {
        dUhg = await uhg.mongo.run.get("general", "uhg")
        for (let member of dUhg) {
          let mapi = await uhg.getApi(member.uuid, ["mojang"])
          if (mapi instanceof Object == false) continue;
          if (mapi.username != member.username) {
            await uhg.mongo.run.update("general", "uhg", {_id:member._id, username: mapi.username})
            uhg.mongo.run.update("general", "verify", {_id:member._id, username: mapi.username})
          }
        }
      }

      dUhg = await uhg.mongo.run.get("general", "uhg")
      uhg.data.uhg = dUhg

      let cache = uhg.dc.cache.uhgroles
      let roleMembers = cache.get("Guild Member").role.members

      /* get UNVERIFIED members with default role */
      dcUnVer = []
      let verifiedRole = uhg.dc.cache.uhgroles.get("🌙Default🌙").role.members
      for (let member of verifiedRole) {
        let v = dVerify.filter(n => n._id==member[0])
        let uVer = dUhg.filter(n => n._id == member._id)

        if (!v.length) {dcUnVer.push(member[1].nickname||member[1].user.username); continue;}

        member = member[1]
        v = v[0]
        if (member._roles.includes("530504032708460584") && !uVer) {
          for (let role of cache) {
            if (role[0] == "🌙Default🌙") continue
            if (member._roles.includes(role[1].id)) try { await member.roles.remove(role[1].role) } catch (e) {}
          }
        }
      }

      /* Refresh roles on uhg dc */
      let membersUHG = cache.get("Guild Member").role.guild.members.cache
      for (let member of membersUHG) {
        if (member[1].user.bot) continue;
        member = member[1]
        //if (member.user.username !== 'DavidCzPdy') continue
        
        let v = dUhg.filter(n => n._id==member.id)
        let v2 = dVerify.filter(n => n._id==member.id) 
        let data = [];
        if (v2.length) data = membersData.filter(n => n.uuid == v2[0].uuid)
        if (!data.length) data = [{username: v2[0] ? v2[0].nickname || '':'', language: v2[0] ? v2[0].language || '':''}]
        data = data[0]
        if (!v.length || !v2.length) {
          if (v2.length) await refresh.uhg_refresh(uhg, member, data, {})
          else {
            for (let role of cache) {
              if (role[0] == "🌙Default🌙") continue
              if (member._roles.includes(role[1].id)) try { await member.roles.remove(role[1].role) } catch (e) {}
            }
          }
          continue;
        }
        v = v[0]
        await refresh.uhg_refresh(uhg, member, data, v)
      }

    } catch(e) {
      if (uhg.dc.cache.embeds) uhg.dc.cache.embeds.timeError(e, eventName);
      else console.log(String(e.stack).bgRed + 'Time error v2');
    } finally {
      time.end(uhg, eventName)
    }
  }
}