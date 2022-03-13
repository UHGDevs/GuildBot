module.exports = async (uhg, pmsg) => {
  console.log(pmsg)
  let api = await uhg.func.getApi(pmsg.nickname)
  if (api instanceof Object == false) return api
  let level = Math.floor(api.hypixel.level) || 0
  let message = `[${level}] ${pmsg.nickname} se chce připojit do guildy!\n https://plancke.io/hypixel/player/stats/${pmsg.nickname}`
  bridge.send(uhg, message)
}
