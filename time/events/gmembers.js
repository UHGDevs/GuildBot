module.exports = {
  name: "gmembers",
  description: "Automatická aktualizace rolí na discordu",
  time: '30 */5 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  onstart: true,
  run: async (uhg) => {
    let date = new Date()
    try {
      let dVerify = await uhg.mongo.run.get("general", "verify")
      uhg.data.verify = dVerify
      let dUhg = await uhg.mongo.run.get("general", "uhg")

      // dUhg.filter(n => typeof n._id !== 'string').forEach(i => {
      //   uhg.mongo.run.delete("general", "uhg", {_id: i._id})
      // });

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
      }
      dUhg.filter(n => !allUuids.includes(n.uuid)).forEach(notuhg => { uhg.mongo.run.delete("general", "uhg", {_id: notuhg._id})});

      /* get UNVERIFIED members */
      unNames = []
      for (let uuid of unUuid) {
        let uApi = await uhg.getApi(uuid, ["mojang", "guild"])
        if (uApi instanceof Object == false) unNames.push({name:uuid, joined: null})
        let joined = Math.floor((new Date().getTime()-uApi.guild.member.joined)/ 86400000)
        unNames.push( {name:uApi.username, joined: joined} )
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
      //console.log(dcUnVer.length)

      for (let member of roleMembers) {
        let v = dUhg.filter(n => n._id==member[0])
        if (!v.length) continue;
        member = member[1]
        v = v[0]
        let grank = "Guild " + v.guildrank
        for (let role of cache) {
          if (role[0] == "Guild Member" || role[0] == "🌙Default🌙") continue
          role = role[1]
          if (member._roles.includes(role.id) && role.name!=grank) try { await member.roles.remove(role.role) } catch (e) {}
          else if (!member._roles.includes(role.id) && role.name == grank) {try { await member.roles.add(role.role) } catch (e) {}}
        }
      }

      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování rolí na UHG dc!"
    }
  }
}
