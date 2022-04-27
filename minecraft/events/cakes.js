let chat = require(`../send.js`)
let bridge = require(`../bridge.js`)
module.exports = async (uhg, pmsg) => {
    let profile = "Grapes";
    let turn = "on";
    console.log(pmsg)
    return
    let api = await uhg.getApi(pmsg.username, ["api", "skyblock", "hypixel", "mojang"], ["main"])
    if (api instanceof Object == false) return api
    let cakes = api.skyblock.main[profile].cakes
    console.log(cakes)
    return chat.send(uhg, {send: `/msg ${pmsg.username} Úspěch`})
}
