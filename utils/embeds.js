const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = (uhg) => {
  uhg.dc.cache.embeds = {}

  uhg.dc.cache.embeds.error = (e, name='kódu') => {
    console.log(String(e.stack).bgRed + '(e)')
    let reg = new RegExp (`${uhg.info.path}.*:(\\d.):(\\d.)`)
    return new MessageEmbed().setTitle(`Chyba v ${name}`).setDescription(String(e.stack).split('  ')[0]).setColor('RED').setFooter({text: String(e.stack).match(reg)? String(e.stack).match(reg)[0].replace(uhg.info.path, ''):'unknown path'})
  }

  uhg.dc.cache.embeds.timeError = (e, name) => {
    console.log(String(e.stack).bgRed + '(Time Event Error)')

    let event = uhg.time.events.get(name)
    if (!event.errors) event.errors = []

    let reg = new RegExp (`${uhg.info.path}.*:(\\d.):(\\d.)`)
    let path = String(e.stack).match(reg)? String(e.stack).match(reg)[0].replace(uhg.info.path, ''):'unknown path'
    let when = `<t:${Math.round(Number(new Date())/1000)}:R>`

    let embed = new MessageEmbed().setTitle(`Chyba v ${name} Time Event ${when}`).setDescription(String(e.stack).split('  ')[0]).setColor('RED').setFooter({text: path})
    event.errors.push({ name: `${when} at ${path}`, value: String(e.stack).split('  ')[0].trim(), inline: false})

    let channel = uhg.dc.client.channels.cache.get('548772550386253824')
    if (channel) channel.send({ embeds:[embed] })

    return `${name} Time Event chyba!\n${String(e.stack).split('  ')[0]}`
  }


}
