const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = (uhg) => {
  uhg.dc.cache.embeds = {}

  uhg.dc.cache.embeds.error = (e, name='kódu') => {
    console.log(String(e.stack).bgRed + '(e)')
    let reg = new RegExp (`${uhg.info.path}.*:(\\d.):(\\d.)`)
    return new MessageEmbed().setTitle(`Chyba v ${name}`).setDescription(String(e.stack).split('  ')[0]).setColor('RED').setFooter({text: String(e.stack).match(reg)? String(e.stack).match(reg)[0].replace(uhg.info.path, ''):'unknown path'})
  }


}
