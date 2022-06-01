const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "profile",
    aliases: ["p"],
    allowedids: [],
    platform: "dc",
    run: async (uhg, message, content) => {
      try {
        let args = content.split(" ").filter(n => n)
        console.log(content)
        console.log(message)
        let args1 = args[0] || message.author.username

        let api = await uhg.getApi(args1, ["api", "hypixel", "mojang"])
        if (api instanceof Object == false) return api

        let embed = new MessageEmbed().setTitle(`**Profil hráče ${api.hypixel.username}**`).setURL(`https://plancke.io/hypixel/player/stats/${api.hypixel.username}`).addFields(
            { name: `Username`, value: `${api.hypixel.username}`, inline: true },
            { name: `UUID`, value: `${api.hypixel.uuid}`, inline: true },
            { name: `Level`, value: `${uhg.f(api.hypixel.level)}` },
            { name: `Rank`, value: `${api.hypixel.rank}`, inline: true},
            { name: `Last login`, value: `<t:${Math.round(api.hypixel.lastLogin/1000)}:R>`}
        )
        message.channel.send({ embeds: [embed] })

      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v profile příkazu!"
      }
    }
  }
