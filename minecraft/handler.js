const fs = require("fs");
module.exports = async (uhg) => {

  const event = require(`./message.js`)
  uhg.mc.client.on("chat", event.bind(null, uhg));
  uhg.mc.client.on("error", function(error) {console.log("CHYBA V botovi:\n" + error.bgRed) })
  uhg.mc.client.on("kick_disconnect", packet => { uhg.dc.cache.channels.get("bot").send(JSON.parse(packet.reason).extra[0].text) })

  uhg.mc.ready = true

  setInterval(() => {
    if (!uhg.mc.send.length || !uhg.mc.ready) return
    uhg.mc.ready = false
    require("./send").write(uhg, uhg.mc.send[0])
    uhg.mc.send.shift()
  }, 520);

}
