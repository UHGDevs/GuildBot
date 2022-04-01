const minecraft = require('minecraft-protocol');
const squid = require('flying-squid');

module.exports = (uhg) => {
  if (uhg.settings.minecraft === true) {

    uhg.mc.client = minecraft.createClient({
      uhg: uhg,
      host: "mc.hypixel.net",
      username: process.env.email,
      password: process.env.password,
      auth: 'microsoft'
    })
    uhg.mc.client.setMaxListeners(Infinity)

    // uhg.on("token", packet => {
    //   console.log(packet)
    // })

//     uhg.mc.client.on("success", (packet, a) => {
// //      console.log(packet)
// //      console.log(a)
//       console.log("BOT LOG ON".brightGreen)
//     })

  } else if (uhg.settings.test === true && uhg.settings.minecraft !== true) {

    uhg.test.server = squid.createMCServer({
        motd: 'A Minecraft Server \nRunning flying-squid',
        port: 25565,
        'max-players': 10,
        'online-mode': false,
        logging: true,
        gameMode: 1,
        difficulty: 1,
        worldFolder: undefined,
        generation: {
           name: 'superflat',
           options: {
              worldHeight: 80
           },
        },
        kickTimeout: 10000,
        plugins: {},
        modpe: false,
        'view-distance': 2,
        'player-list-text': {
           header: { text: 'aaaaaaaa' },
           footer: { text: 'Test server' },
        },
        'everybody-op': true,
        'max-entities': 10,
        version: '1.16.1',
     })

    uhg.mc.client = minecraft.createClient({
     host: "localhost",
     port: 25565,
     username: "Technoblade",
     version: "1.16.1"
    })

  }
}
