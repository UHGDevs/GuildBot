module.exports = {
    info: {
        content: null,
        embeds: [
          {
            title: "**Informace k G-Boxům**",
            description: "**Co jsou G-Boxy?**\nJde prakticky o loot boxy, které jdou odemknout klíčem koupeným za GEXPy.\n\n**Jak získám GEXPy?**\nGEXPy jdou získat normálním hraním na Hypixelu _(/g member [vás nickname])_ nebo je lze vyhrát na UHG eventech.\n\n**Jak můžu G-Box otevřít?**\nNejdřív si musíte koupit klíč k danému boxu. Jsou 3 druhy boxů, Wooden za 10,000 GEXP, Golden za 100,000 GEXP a Diamond za 1,000,000 GEXP. Prakticky platíte za klíč nikoliv za G-Box. Po koupi klíče zjistíte jaká rarita klíče vám padla a od toho se bude odvíjet i Váš loot v G-Boxu.\n\n**Jsou nějaké příkazy?**\nAno. Můžete je psát do #commands:\n``/inventory`` _(zobrazí, co vše máte z G-Boxů, kolik máte GEXP a jaké máte klíče)_\n``/woodgbox`` _(zobrazí GUI pro Wooden G-Box)_\n``/goldgbox`` _(zobrazí GUI pro Golden G-Box)_\n``/diagbox`` _(zobrazí GUI pro Diamond G-Box)_\n``/loot KeyChance`` _(zobrazí šance na získání jednotlivých rarit klíčů)_\n``/loottable`` _(zobrazí všechny možné dropy z G- boxů a jejich % šance)_\n\n**Co když drop nechci/nemohu uplatnít?**\nVšechny dropy lze prodat, buď rovnou v GUI otevřeného G-Boxu pomocí tlačítka \"Prodat\" nebo pomocí příkazu /inventory, kde můžete konkrétní itemy spravovat.",
            color: "#00fff5"
          }
        ],
        attachments: [],
        components: [
            {
                type: 'ACTION_ROW',
                components: [
                    {
                        type: 'BUTTON',
                        label: 'G-Boxy',
                        customId: 'LOOT_box',
                        style: 'PRIMARY',
                        emoji: { animated: false, name: '🎁', id: null },
                        url: null,
                        disabled: false
                    },
                    {
                        type: 'BUTTON',
                        label: 'Inventory',
                        customId: 'LOOT_inventory',
                        style: 'PRIMARY',
                        emoji: { animated: false, name: '🧺', id: null },
                        url: null,
                        disabled: false
                    },
                    {
                        type: 'BUTTON',
                        label: 'G-Keys',
                        customId: 'LOOT_key',
                        style: 'PRIMARY',
                        emoji: { animated: false, name: '🔑', id: null },
                        url: null,
                        disabled: false
                    }
                ]
            }
        ]
      },
      keys: {
        content: null,
        embeds: [
          {
            title: "Šance na klíče:",
            color: null,
            image: {
              url: "https://cdn.discordapp.com/attachments/674368183259496458/997492932946968607/klice.png"
            }
          }
        ],
        attachments: [],
        ephemeral: true
      }
}