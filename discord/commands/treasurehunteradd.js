module.exports = {
    name: "treasurehunteradd",
    aliases: ["thadd"],
    allowedids: ["959129385993125888", "312861502073995265", "379640544143343618", "427198829935460353", "378928808989949964"],
    platform: "dc",
    run: async (uhg, message, content) => {
      try {
        console.log(message)
        console.log(content)
        //uhg.mongo.run.post("general", "treasure", data)
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v treasurehunteradd příkazu!"
      }
    }
  }
  