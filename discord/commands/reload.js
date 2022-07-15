module.exports = {
  name: "reload",
  aliases: [],
  allowedids: ["378928808989949964", "312861502073995265"],
  platform: "dc",
  run: async (uhg, message, content) => {
    try {
      let args = content.toLowerCase().split(" ").filter(n => n)
      if (!args.length) return "Napiš jméno commandu nebo kategorie!"

      if (args[0] == "dc" || args[0] == "mc" || args[0] == "all" || args[0] == "time") {
        let req = Object.keys(require.cache).filter(n => n.includes(require.main.path) && !n.includes("node_modules"))
        if (args[0] == "mc") req = Object.keys(require.cache).filter(n => n.includes("/minecraft/"))
        else if (args[0] == "dc") req = Object.keys(require.cache).filter(n => n.includes("/discord/"))
        else if (args[0] == "time") req = Object.keys(require.cache).filter(n => n.includes("/time/"))

        ignore = ["index.js", "handler.js", "mongodb.js", "commands.js", "message.js", "/discord/events/"]
        req = req.filter(n=>!ignore.some(s=>n.includes(s)))

        req.forEach(item => {
          delete require.cache[item]
          if (item.includes("api.js")) uhg.getApi = require(item)
          if (!item.includes("/commands/") && !item.includes("/time/events/")) return

          let newcmd = require(item)
          if (item.includes("/discord/commands/")) uhg.dc.commands.set(newcmd.name, newcmd)
          else if (item.includes("/minecraft/commands/")) uhg.mc.commands.set(newcmd.name, newcmd)
          else if (item.includes("/time/events/")) uhg.time.events.set(newcmd.name, newcmd)
          else if (item.includes("discord/commandsCmd")) uhg.dc.cmd.set(cmd.name, newcmd);
        });

        return `Success reload -> ${args[0]}`
      }

      let cmd = uhg.dc.commands.get(args[0]) || uhg.dc.commands.get(uhg.dc.aliases.get(args[0])) || uhg.mc.commands.get(uhg.mc.aliases.get(args[0])) || uhg.dc.cmd.get(args[0]);
      if (!cmd) return "neplatný command"
      let path = "../../minecraft/commands/"
      if (cmd.platform == "dc") path = "./"
      else if (cmd.platform == "cmd") path = "../commandsCmd"

      try {
        delete require.cache[require.resolve(`${path}/${cmd.name}.js`)]

        let newcmd = require(`${path}/${cmd.name}.js`) || {name: "error"}
        if (path == "./") uhg.dc.commands.set(cmd.name, newcmd)
        else if (path == "../commandsCmd") uhg.dc.cmd.set(cmd.name, newcmd);
        else uhg.mc.commands.set(cmd.name, newcmd)

        return `Command ${newcmd.name} se podařilo aktualizovat`
      } catch (e) {return "nepodařilo se"}


      return "ggs"
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return "Chyba v reload příkazu!"
    }
  }
}
