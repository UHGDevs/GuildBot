const fs = require("fs");
const cron = require('cron').CronJob;
module.exports = async (uhg) => {
  const autoupdate = new cron('*/10 * * * * *', async function() {
    console.log("TIME")
  })
  //autoupdate.start();
  //console.log(autoupdate)
}
