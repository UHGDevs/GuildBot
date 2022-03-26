const fs = require("fs");
module.exports = (uhg) => {
    try {
        const commands = fs.readdirSync(`discord/commands/`).filter((file) => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`./commands/${file}`);
            if (pull.name) uhg.dc.commands.set(pull.name, pull);
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => uhg.dc.aliases.set(alias, pull.name));
        }
        console.log(`${uhg.dc.commands.size} Discord Commands`.brightGreen);
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
}
