module.exports = {
  name: "gmembers",
  description: "Automatická aktualizace databáze",
  time: '0 */5 * * * *', //'*/10 * * * * *'
  ignore: '* * 0,23 * * *', //'sec min hour den(mesic) mesic den(tyden)'
  run: async (uhg) => {
    let date = new Date()
    try {
      let dVerify = await uhg.mongo.run.get("general", "verify")
      uhg.data.verify = dVerify
      let dUhg = await uhg.mongo.run.get("general", "uhg")

      // dUhg.filter(n => typeof n._id !== 'string').forEach(i => {
      //   uhg.mongo.run.delete("general", "uhg", {_id: i._id})
      // });


      let api = await uhg.func.getApi("64680ee95aeb48ce80eb7aa8626016c7", ["guild"])
      if (api instanceof Object == false) return console.log(api)

      let members = api.guild.all.members

      let unUuid = []
      let allUuids = []

      /* UHG list refresh */
      for (let member of members) {
        allUuids.push(member.uuid);
        let vMember = dVerify.filter(n => n.uuid == member.uuid)
        if (!vMember.length) unUuid.push(member.uuid);
        else if (!dUhg.filter(n => n.uuid == member.uuid).length) uhg.mongo.run.post("general", "uhg", {_id:vMember[0]._id, username:vMember[0].nickname, uuid: vMember[0].uuid, guildrank: member.rank })
      }

      dUhg.filter(n => !allUuids.includes(n.uuid)).forEach(notuhg => { uhg.mongo.run.delete("general", "uhg", {_id: notuhg._id})});
      await uhg.func.delay(1000)

      dUhg = await uhg.mongo.run.get("general", "uhg")
      uhg.data.uhg = dUhg
      if (date.getHours() === 2 && date.getMinutes === 0) {
        for (let member of dUhg) {
          let mapi = await uhg.func.getApi(member.uuid, ["mojang"])
          if (mapi instanceof Object == false) continue;
          if (mapi.username != member.username) {
            await uhg.mongo.run.update("general", "uhg", {_id:member._id, username: mapi.username})
            await uhg.mongo.run.update("general", "verify", {_id:member._id, username: mapi.username})
          }
        }
      }

      for (let member of members) {
        let database;
      }
      return

    } catch(e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v refreshování databáze!"
    }
  }
}
