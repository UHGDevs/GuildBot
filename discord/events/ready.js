module.exports = async (uhg) => {

  console.log(`Discord Bot is online! (${uhg.dc.client.user.tag})`.bold.brightGreen)
  uhg.dc.client.user.setActivity(' Guild Chat', { type: 'WATCHING' });
  uhg.dc.channels = {}
  uhg.dc.channels.botjs = await uhg.dc.client.channels.cache.get("875503798733385779")

}
