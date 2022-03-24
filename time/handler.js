const fs = require("fs");
const cron = require('cron').CronJob;
module.exports = async (uhg) => {
  let events = []
  const files = fs.readdirSync(`time/events`).filter((file) => file.endsWith(".js"));
  for (const file of files) { try { events.push(require(`./events/${file}`)) } catch (e) {console.log(e)} }

  console.log(events)

  console.log(`${events.length} Time Events prepared`.brightGreen);

  const autoupdate = new cron('*/10 * * * * *', async function() {
    console.log("TIME")
  })
  //autoupdate.start();
  //console.log(autoupdate)
  //uhg.time.database.refresh = now
}
