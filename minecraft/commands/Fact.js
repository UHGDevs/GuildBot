module.exports = {
    name: "Fact",
    aliases: ["fact", "facts", "hypixelfact", "hypixelfacts", "funfact", "funfacts", "fakt", "fakty"],
    run: async (uhg, pmsg) => {
      try{
        let api = await uhg.getApi(pmsg.nickname, ["api", "skyblock", "hypixel", "mojang", "online", "gamecounts"])
        if (api instanceof Object == false) return api

        let fact2 = "Vypadá to, že momentálně hraješ.. vypadá to, že momentálně nic nehraješ :/"
        if (api.online.game && api.online.mode != "lobby") fact2 = `Vypadá to, že momentálneš hraješ ${api.online.game}`

        let fact9 = `SIMP CHECK >>>>> PROCESSING RESULTS -+-+- RESULTS: NEGATIVE`
        if (api.username == "zmikisek" || api.username == "0hBlood" || api.username == "unisdynasty") fact9 = `SIMP CHECK >>>>> PROCESSING RESULTS -+-+- RESULTS: POSITIVE`

        let facts = [
            "Fact #0 - Označili byste fakt č. 0 jako nultý fakt, nebo první fakt?",
            "Fact #1 - Vývojáři tohoto bota jsou DavidCzPdy a Farmans.. Můžete hádat, kdo z nich dělal tento zbytečný příkaz",
            `Fact #2 - ${fact2}`,
            `Fact #3 - Momentálně se v Limbu nachází ${uhg.f(api.gamecounts.games.limbo || 0)} hráčů`,
            `Fact #4 - Momentálně na serveru hraje ${uhg.f(api.gamecounts.playerCount || 0)} hráčů`,
            `Fact #5 - Víte, že MVP++ má na lobby Speed II, ale ostatní ranky jen Speed I? P2W server, confirmed`,
            `Fact #6 - Momentálně na Hypixelu je přes 50 možných her, dokážeš je všechny vymasterovat?`,
            `Fact #7 - Víte, že na SkyBlocku existuje takový Cookie Clicker? Najdete ho v Booster Cookie menu`,
            `Fact #8 - Víte, že když si změníte jazyk na serveru, tak se vám změní nápisy psanými bloky? Například LEAD a INFO na různých lobby`,
            `Fact #9 - ${fact9}`,
            `Fact #10 - Jak mám ksakru testovat tento příkaz, když to trvá 5 let, než se dostanu na ten konkrétní fakt, který chci!!`,
            `Fact #11 - Momentálně ${uhg.f(api.gamecounts.games.skyblock.crimson_isle || 0)} hráčů hraje na Crimson Isle`,
            `Fact #12 - Momentálně ${uhg.f(api.gamecounts.games.skyblock.dungeons || 0)} hráčů throwují v Dungeonech`,
            `Fact #13 - Tipněte si kolik lidí je momentálně v Crystal Hollows.... špatně, haha, je jich tam přesně ${uhg.f(api.gamecounts.games.skyblock.hollows || 0)}`,
        ];
        let randomNumber = Math.random() 
        console.log(randomNumber*facts.length)
        let index = Math.floor(randomNumber*facts.length)
        let message = facts[index]
        return message
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v fact příkazu!"
      }
    }
  }
  