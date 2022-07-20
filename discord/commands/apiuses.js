const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "apiuses",
    aliases: ["api", "apiuses", "apikey", "key", "uses", "apiuse"],
    allowedids: [],
    platform: "dc",
    run: async (uhg, message, content) => {
      try {
        let api = await uhg.getApi("fb811b92561e434eb5b6ef04695cc49a", ["key"])
        if (api instanceof Object == false) return api

        let embed = new MessageEmbed().setTitle(`**Kolikrát bylo API použito?**`).addFields(
            { name: "**Celkem**", value: `${api.key.totaluses}`, inline: false},
            { name: "**Za minutu**", value: `${api.key.uses}`, inline: false }
        )

        message.channel.send({ embeds: [embed] })

      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v apiuses příkazu!"
      }
    }
  }
