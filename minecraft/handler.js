const fs = require("fs");
module.exports = async (uhg) => {

  const event = require(`./message.js`)
  uhg.mc.client.on("chat", event.bind(null, uhg));

  uhg.mc.ready = true

  setInterval(() => {
    if (!uhg.mc.send.length || !uhg.mc.ready) return
    uhg.mc.ready = false
    require("./send").write(uhg, uhg.mc.send[0])
    uhg.mc.send.shift()
  }, 520);

}
