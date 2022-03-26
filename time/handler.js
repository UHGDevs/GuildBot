const fs = require("fs");
const cron = require('cron').CronJob;
module.exports = async (uhg) => {
  const files = fs.readdirSync(`time/events`).filter((file) => file.endsWith(".js"));
  for (const file of files) {
    let pull = require(`./events/${file}`);
    uhg.time.events.set(pull.name, pull)
  }

  console.log(uhg.time.events)

  console.log(`${uhg.time.events.size} Time Events prepared`.brightGreen);

  const autoupdate = new cron('*/10 * * * * *', async function() {
    console.log("TIME")
  })
  //autoupdate.start();
  //console.log(autoupdate)
  //uhg.time.database.refresh = now
}
