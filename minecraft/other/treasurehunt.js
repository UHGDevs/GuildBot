let chat = require(`../send.js`)
let bridge = require(`../bridge.js`)
module.exports = async (uhg, pmsg) => {
    let content = pmsg.content.replaceAll("/", "").trim().split(" ")
    if (!content.length || content.length !==4) return
    let x = Number(content[0])
    let y = Number(content[1])
    let z = Number(content[2])
    let c = Number(content[3].replace("#", ""))
    if (x === NaN || y === NaN || z === NaN || c === NaN) return

    let database = await uhg.mongo.run.get('general', 'treasure', { _id: c })
    if (!database.length) return chat.send(uhg, {send: `/msg ${pmsg.username} obrázek číslo ${c} nebyl nalezen!`})
    database = database[0]

    if (database.winner) return chat.send(uhg, {send: `/msg ${pmsg.username} obrázek číslo ${c} už byl uhádnut!`})
    let nameStop = database.names.filter(n => n == pmsg.username)
    if (nameStop.length > 15) return chat.send(uhg, {send: `/msg ${pmsg.username} obrázek číslo ${c} jsi už 15x neuhádl, nejde ho dál hádat!`})

    let coords = `${x} ${y} ${z}`
    if (coords !== database.coords)  {
      chat.send(uhg, {send: `/msg ${pmsg.username} souřadnice ${coords} obr. č. ${c} nejsou správné!`})
      let names = database.names
      names.push(pmsg.username)
      uhg.mongo.run.update('general', 'treasure', { _id:c }, {guesses: database.guesses += 1, names: names})
      return
    }

    let points = pmsg.verify_data.points_0 || 0
    points += 1
    chat.send(uhg, {send: `/msg ${pmsg.username} Správná odpověď! Počet bodů: ${points}!`})
    chat.send(uhg, {send: `/gc ${pmsg.username} uhádl obrázek č. ${c}! Aktuální počet bodů: **${points}**`})
    bridge.info(uhg, {msg: `Guild > **${pmsg.username}** uhádl obrázek č. ${c}! Aktuální počet bodů: **${points}**`})

    uhg.mongo.run.update('general', 'uhg', { username: pmsg.username }, { points_0: points })
    uhg.mongo.run.update('general', 'treasure', { _id:c }, {winner: pmsg.username})

    try {
      let message = await uhg.dc.client.channels.cache.get('962729811518820382').messages.fetch(database.msgID)
      message.delete()
    } catch (e) {

    }
    return
}
