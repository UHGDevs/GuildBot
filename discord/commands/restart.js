module.exports = {
  name: "restart",
  aliases: [],
  allowedids: ["959129385993125888", "312861502073995265", "379640544143343618", "427198829935460353", "378928808989949964"],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
//require("../../utils/client")(uhg)
//uhg.mc.client.connect("25565", "mc.hypixel.net")
return "WIP"
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v restart příkazu!"
    }
  }
}
