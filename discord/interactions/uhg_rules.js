const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

let denined =  new MessageActionRow().addComponents(new MessageButton().setCustomId('guild_denined').setLabel('ODMÍTNUTO').setStyle('DANGER').setDisabled(true))
let accepted =  new MessageActionRow().addComponents(new MessageButton().setCustomId('guild_accepted').setLabel('PŘIJATO').setStyle('SUCCESS').setDisabled(true))
let invited =  new MessageActionRow().addComponents(new MessageButton().setCustomId('guild_invited').setLabel('POZVÁNO').setStyle('PRIMARY').setDisabled(true))

module.exports = async (uhg, interaction) => {
  let type = interaction.customId.split('_')[2]
  //await interaction.update({ type:6, ephemeral: true })

  let embed;

  if (type == 'pravidla') embed = new MessageEmbed().setTitle("**Pravidla guildy**").setDescription("**1.** Nikomu nenadávejte a chovejte se slušně\n\n**2.** Povolené reklamy v guild chatu jsou **POUZE**: soc. sítě, SkyBlock aukce a forum posty, zbytek je na domluvě\n\n**3.** Nepište zbytečně do chatu kraviny a nespamujte commandy přes guild bota\n\n**4.** Nově příchozí hráče je dobré přivítat v guildě, aby měl lepší pocit z komunity a naopak když někdo odpojí guildu, tak upřednostněte \"F\" před \"L\"\n\n**5.** Jste-li potrestáni mutem nebo demotem a myslíte si, že je to neprávem, tak danému členovi A-teamu nenadávejte, ale v klidu to vyřešte a vysvětlete mu co se stalo nebo o co jde a jste-li na 100% přesvědčeni, že jde o omyl a daný člen A-teamu to nehodlá řešit, zeptejte se jiného admina či majitele\n\n**6.** Respektujte všechny členy guildy a obzvlášť členy A-teamu\n\n**7.** Používejte zdravý rozum a nechovejte se jako průměrný Qplay hráč")
  else if (type == 'elites') embed = new MessageEmbed().setTitle("**Elite membeři**").setDescription("➙ 10 nejlepších hráčů v GEXP za týden\n➙ konec týdne bývá v neděli kolem 17:00\n\n_Použijte /gexp v <#555832215922278401> pro zobrazení leaderboardu GEXP_")
  else if (type == 'events') embed = new MessageEmbed().setTitle("**UHG Eventy**").setDescription("Většinou jde o turnaje v různých minihrách, vše se oznamuje v <#715989905532256346>, zároveň pořádáme celoměsíční soutěž o největší počet GEXP o rank upgrade (jen VIP, VIP+, nebo MVP++) nebo o 20mil Skyblock coinů.")
  else if (type == 'bot') embed = new MessageEmbed().setTitle("**Guild Bot (UHGuild)**").setDescription("Všechny funkce:\n➙\n➙\n➙\n➙\n➙\n➙\n➙\ntu si toho dej kolik chceš")
  else if (type == 'splashes') embed = new MessageEmbed().setTitle("**Bingo splashes**").setDescription("Pro koupi předplatného na 1 bingo event (7 dní) napište <@379640544143343618> do DM. Domluva předplatného je nezávazná do posledního dne měsíce, aby nedošlo k problémům s placením.\n\n**Cena:** \nCena všech splashů za celý týden je 28M, takže každý předplatitel musí do 30. dne měsíce (1 den před bingem) zaplatit tuto částku:\n_28,000,000/počet předplatitelů = cena splashů za jednoho_\n\n**Časy splashů:** \nPrvních 7 dní měsíce od 15:00 do 21:00 každou hodinu, více info v <#977140468263571526> (otevřeno pro předplatitele)\n\n**Pravidla:**\n➙ platíte za celý event ne jen za 1 splash\n➙ platba pouze ve SkyBlock coinech\n➙ žádné refundy\n➙ neleakovat splashe (pod trestem vyloučení ze splashů)\n➙ pokud máte kamaráda, který chce koupit předplatné, ale není v guildě, tak může taky (pro Guild membery i jejich kamarády)\n\n``Všechny platby musí být provedeny do posledního dne v měsíci!!!``")


  if (!embed) return interaction.reply({ content: 'fatal error LOL', ephemeral: true })
  interaction.reply({ ephemeral: true, embeds: [embed] })

}
