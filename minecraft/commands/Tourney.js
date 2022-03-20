module.exports = {
    name: "Tourney",
    aliases: ["tourney", "tournament", "tour"],
    run: async (uhg, pmsg) => {
      try{
        let nickname = pmsg.nickname
        let getmode = pmsg.args
        let args1;
        let args2;
        if (getmode) args1 = getmode.split(" ")[0]
        if (getmode) args2 = getmode.split(" ")[1]
        let mode;
        let game = ["game", "bw", "stats", "bedwars"];
        let basic = ["basic", "normal", "overall", "základní"]
        if (args1 === "basic" || args1 === "normal" || args1 === "overall" || args1 === "základní" || args1 === "game" || args1 === "bw" || args1 === "stats" || args1 === "bedwars") nickname = args2 || pmsg.username
        if (args2 === "basic" || args2 === "normal" || args2 === "overall" || args2 === "základní" || args2 === "game" || args2 === "bw" || args2 === "stats" || args2 === "bedwars") nickname = args1 || pmsg.username
        if (args1 === "basic" || args1 === "normal" || args1 === "overall" || args1 === "základní" || args2 === "basic" || args2 === "normal" || args2 === "overall" || args2 === "základní") mode = "basic"
        if (args1 === "game" || args1 === "bw" || args1 === "stats" || args1 === "bedwars" || args2 === "game" || args2 === "bw" || args2 === "stats" || args2 === "bedwars") mode = "game"
        let api = await uhg.func.getApi(nickname)
        if (api instanceof Object == false) return api
        let tourney = api.hypixel.stats.tourney
        let currenttournament = tourney.currenttournament
        let ctfancy = "Bed Wars Doubles" //   UPDATOVAT
        let ctourney = tourney[currenttournament]
        if (!currenttournament) return "Momentálně se neodehrává žádný turnaj"
  
        let message = `Použij příkaz takhle: "!tourney game" nebo "!tourney basic"`
        if (mode === "basic") message = `${ctfancy} Tourney: ${api.username} - ${tourney.games}/${tourney.maxgames} Games - ${tourney.tributes}/100 Tributes (Total: ${tourney.totaltributes}) - ${tourney.playtime}min Playtime`
        else if (mode === "game") message  = `${ctfancy} Tourney: ${api.hypixel.stats.bedwars.levelformatted} ${api.username} - ${uhg.func.f(ctourney.finalKills)}Finals ${uhg.func.f(ctourney.wins)}Wins ${uhg.func.f(ctourney.fkdr)}FKDR ${uhg.func.f(ctourney.wlr)}WLR`
        return message
      } catch (e) {
          console.log(String(e.stack).bgRed)
          return "Chyba v Tourney příkazu!"
      }
    }
  }
  