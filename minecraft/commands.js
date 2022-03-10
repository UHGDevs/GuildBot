const fs = require("fs");

module.exports = (uhg) => {
    try {
      return
        let amount = 0;
        const commands = fs.readdirSync(`minecraft/commands/`).filter((file) => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`./commands/${file}`);
            if (pull.name) {
                  uhg.mc.commands.set(pull.name, pull);
                  amount++;
              } else {
                  console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
                  continue;
              }
              if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.mcaliases.set(alias, pull.name));
          }
        console.log(`${amount} Minecraft Commands`.brightGreen);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}
