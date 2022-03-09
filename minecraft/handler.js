const fs = require("fs");
module.exports = async (uhg) => {


  const event = require(`./message.js`)
  uhg.mc.client.on("chat", event.bind(null, uhg));

}
