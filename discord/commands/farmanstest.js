module.exports = {
    name: "farmanstest",
    aliases: ["farmanstest"],
    allowedids: ["312861502073995265"],
    platform: "dc",
    run: async (uhg, message, content) => {
      try {

        if (content == "a") {
          let role = message.guild.roles.cache.find(r => r.id === "973678831955234827");

          let member = message.guild.members.cache.get(message.author.id)
  
          member.roles.add(role)

          return "DONE a"
        }

        if (content == "r") {
          let role = message.guild.roles.cache.find(r => r.id === "973678831955234827");

          let member = message.guild.members.cache.get(message.author.id)
  
          member.roles.remove(role)

          return "DONE r"
        }

      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v farmanstest příkazu!"
      }
    }
  }
  