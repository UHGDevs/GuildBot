const { Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');

class Sniper {
  constructor(uhg, api, notify) {
    this.uhg = uhg
    this.getApi = uhg.func.getApi
    this.username = api.username
    this.uuid = api.uuid
    this.notify = notify
    this.setup = this.setup()
    this.totalchecks = 0
    this.checks = 0
  }

  setup() {
    delete this.setup
    if (this.notify === false) delete this.notify
    return "for UHG Snipers"
  }

  async run() {
    this.totalchecks += 1
    let api = await this.getApi(this.uuid, ["online", "recent"])
    if (api instanceof Object == false) return this.echo(api, false, new MessageEmbed().setColor('RED').setTitle('ERROR V API').setDescription(api).setFooter({ text: 'By DavidCzPdy' }))

    if (!api.online.online) {
      uhg.snipe.delete(this.username)
      return this.echo("Hráč není online, vypnuto")
    }

    if (this.checks && (this.game != api.online.game || this.map != api.online.map || this.mode != api.online.mode)) {
      this.game = api.online.game
      this.map = api.online.map
      this.mode = api.online.mode
      this.echo("Změna!", `<@${this.author}>`, new MessageEmbed().setColor('GREEN').setTitle('ZMĚNA!').setDescription("podrobnosti soon").setFooter({ text: 'By DavidCzPdy' }))
      this.checks += 1
      return
    }


    this.checks += 1

    if (this.checks%5==0) {
      let embed = new MessageEmbed().setColor('GREY').setTitle(`Watching ${this.username}`).setFooter({ text: 'By DavidCzPdy' })
      embed.setDescription(`**Status:**Žádná změna\n**Time:** \`number\`\n**Total Checks:** \`${this.checks}\``)
      return this.echo(`${this.username} je stále ve hře!`, null, embed)
    }

    console.log(api)
    //this.echo(api.online.footer)
    return
  }

  async echo(message, mention="", embed=null) {
    if (embed) this.message.channel.send({ content: mention, embeds: [embed] })
    else this.message.channel.send(message + " " + mention)
    if (this.notify) this.uhg.mc.send.push({send: `/msg ${this.notify} ` + message})
  }
}


module.exports = Sniper
