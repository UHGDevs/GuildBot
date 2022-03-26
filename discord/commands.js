const fs = require("fs");
module.exports = (uhg) => {
    try {
        let amount = 0;
        const commands = fs.readdirSync(`discord/commands/`).filter((file) => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`./commands/${file}`);
            if (pull.name) {
                  uhg.dc.commands.set(pull.name, pull);
                  amount++;
              } else {
                  console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
                  continue;
              }
              if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => uhg.dc.aliases.set(alias, pull.name));
          }
        console.log(`${amount} Discord Commands`.brightGreen);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}
