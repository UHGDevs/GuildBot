const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'cmd',
  description: 'Hypixel in-game commands',
  options: [
    {
      name: "command",
      description: "Vyber si command",
      type: "STRING",
      required: true,
      autocomplete: true
    },
    {
      name: 'player',
      description: 'Vyber si hráče',
      type: 'STRING',
      required: false,
      autocomplete: true
    },
    {
      name: 'reason',
      description: 'Vyber důvod',
      type: 'STRING',
      required: false,
      //autocomplete: true
    }
  ],
  run: async (uhg, interaction, args) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    try {
      let command = interaction.options.getString('command')

      if (command == 'notmember') return interaction.editReply({ content: 'Připoj se do UHG, nebo si nějak jinak sežeň commandy!!' })

      if (command == 'unverified') {
        if (!uhg.data.unverified) {
          let unUuid = []
          let dVerify = await uhg.mongo.run.get("general", "verify")
          uhg.data.verify = dVerify
          let api = await uhg.getApi("64680ee95aeb48ce80eb7aa8626016c7", ["guild"])
          if (api instanceof Object == false) return console.log(api)
          for (let member of api.guild.all.members) {
            let vMember = dVerify.filter(n => n.uuid == member.uuid)
            if (!vMember.length) unUuid.push(member.uuid);
          }
          unNames = []
          for (let uuid of unUuid) {
            let uApi = await uhg.getApi(uuid, ["mojang", "guild"])
            if (uApi instanceof Object == false) {unNames.push({name:uuid, joined: null, date: null}); continue;}
            let joined = Math.floor((new Date().getTime()-uApi.guild.member.joined)/ 86400000)
            unNames.push( {name:uApi.username, joined: joined, date: `<t:${Math.round(uApi.guild.member.joined/1000)}:R>`} )
          }
          uhg.data.unverified = unNames
        }
        let send = []
        uhg.data.unverified.forEach(player => {send.push(`${player.name} - ${player.joined}D`)});
        let embed = new MessageEmbed().setTitle(`**UNVERIFIED UHG members**`)//.addField()
        //message.channel.send({ embeds: [embed] })
        return interaction.editReply({ content: send.join("\n") })
      }


      await interaction.editReply({ content: 'coming soon' })
      return
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return 'Chyba v cmd slash příkazu!'
    }
  }
}
