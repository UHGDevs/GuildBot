const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const html = require('node-html-to-image')
const fs = require('fs');

module.exports = {
  name: "html",
  allowedids: ["378928808989949964", "312861502073995265"],
  allowedroles: [],
  platform: "cmd",
  queue: { name: 'html', value: 'html', sort: -100 },
  run: async (uhg, interaction) => {
    try {
      let data = require('../html/data.js')
console.log(data)
      let user = interaction.options.getString('player') || interaction.member.nickname || interaction.user.username
      let api = await uhg.getApi(user, ["api", "hypixel", "mojang", 'guild'])
      if (api instanceof Object == false) return interaction.editReply({ content: api })
console.log(api.hypixel.rank)

      const image = await html({
        html: data.test_index,
        content: { styles: data.test_css, backround: data.test_backround, name: api.hypixel.username, rank: api.hypixel.rank }
      });

        interaction.editReply({ content: 'Soon: ', files: [{attachment: image, name: 'david>all.png'}]  })


      //interaction.editReply({ content: 'Soon: ' })
      //interaction.editReply({ content: 'Soon: ' })

    } catch (e) {
      console.log(String(e.stack).bgRed)
      interaction.editReply({ content: 'Chyba v cmd html příkazu: ' + String(e.stack).split('    ')[0] })
      return "Chyba v cmd html příkazu!"
    }
  }
}
