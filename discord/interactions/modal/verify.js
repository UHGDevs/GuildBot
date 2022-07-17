const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Modal, TextInputComponent, showModal, MessageSelectMenu } = require("discord.js");

exports.send = async (uhg, interaction) => {
    let auth = ["312861502073995265", "427198829935460353", "378928808989949964", "379640544143343618"]
    const usernameInput = new MessageActionRow().addComponents(new TextInputComponent().setCustomId('modal_test_username').setLabel("Username:").setStyle('SHORT'));
    const languageInput = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('modal_test_language').setPlaceholder('Select language').addOptions([
            { label: 'CZECH', /* description: '',*/ value: 'czech' },
            { label: 'SLOVAK', /* description: '', */ value: 'slovak' },
            { label: 'ENGLISH', description: 'Or any other language', value: 'english' } ])
    );
   
    let components = [
        {
            components: [
                {
                    custom_id: 'modal_verfiy_username',
                    label: 'Username:',
                    max_length: null,
                    min_length: null,
                    placeholder: null,
                    required: true,
                    style: 1,
                    type: 4,
                    value: null
                    }
            ],
            type: 1
        },
        {
            components: [
                {
                    custom_id: 'modal_verfiy_language',
                    label: 'Your language: (cz/sk/en) - not working yet',
                    max_length: 2,
                    min_length: 2,
                    placeholder: null,
                    required: true,
                    style: 1,
                    type: 4,
                    value: null
                    }
            ],
            type: 1
        } 
    ]
    if (auth.includes(interaction.user.id)) components.push({components: [{ custom_id: 'modal_verfiy_custom', label: 'Custom Verify:', max_length: 18, min_length: 18, placeholder: null, required: false, style: 1, type: 4, value: null }], type: 1 })
    const modal = new Modal().setCustomId('get_modal_verify').setTitle('UHG Verifikace');
    modal.addComponents(components)

    await interaction.showModal(modal);
}

exports.get = async (uhg, interaction) => {
    let username = interaction.fields.getTextInputValue('modal_verfiy_username')
    let language = interaction.fields.getTextInputValue('modal_verfiy_language') || ''//.toLowerCase()
    let custom;
    try {custom = interaction.fields.getTextInputValue('modal_verfiy_custom')} catch (e) {} 
    // console.log(username)
    // console.log(language)
    // console.log(custom)
    if (!language.match(/cz|sk|en/i)) {return interaction.reply({ content: 'Invalid language! CZ/SK/EN', ephemeral: true })}
    
    let gUhg = uhg.dc.client.guilds.cache.get('455751845319802880')
    let gBw = uhg.dc.client.guilds.cache.get('874337528621191251')

    let user = interaction.user;
    let coment = ''

    if (custom) {
        if (!Number(custom) && custom.length < 17) {return interaction.reply({ content: 'Invalid style of requesting custom verify! (discord id)', ephemeral: true })}
        user = uhg.dc.client.users.cache.get(custom)
        if (!user) {return interaction.reply({ content: 'Invalid ID! Make sure player is on server with bot', ephemeral: true })}
    }

    await interaction.reply({ content: 'Starting verification!', ephemeral: true });

    let api = await uhg.getApi(username, ["key", "hypixel", "mojang", "guild"])
    if (api instanceof Object == false) return interaction.editReply({ content: api })
    username = api.username
    if (!custom && api.hypixel.links.DISCORD !== `${user.username}#${user.discriminator}`) {return interaction.editReply({ content: "Link your Discord with Hypixel" })}

    let refresh = require('../../../utils/serverroles.js')
    let uhgMember = gUhg.members.cache.get(user.id)
    if (uhgMember) { // UHG Discord server
        refresh.uhg_refresh(uhg, uhgMember, api.hypixel, api.guild)
    }

    let bwMember = gBw.members.cache.get(user.id)
    if (bwMember) { // BW Discord server
        refresh.bw_refresh(uhg, bwMember, api.hypixel)
    }

    let verified = await uhg.mongo.run.get("general", "verify")
    uhg.data.verify = verified
    verified = verified.filter(n => n._id == user.id)
    if (verified.length && verified[0].nickname == username) {return interaction.editReply({ content: `Už ${custom ? 'je':'jsi'} verifikovaný` })}

    let filtered = uhg.data.verify.filter(n => n.uuid == api.uuid)
    if (filtered.length) uhg.mongo.run.delete("general", "verify", {_id:filtered[0]._id})

    let post = await uhg.mongo.run.post("general", "verify", { _id: user.id, uuid: api.uuid, nickname: username, names: api.hypixel.nicks })
    if (!post.acknowledged) {return interaction.editReply({ content: 'Nastala chyba v nahrávání informací do databáze!' })}
    if (!custom && !verified.length && post.insertedId==user.id) await interaction.editReply({ content: `Úspěšná verifikace jako \`${username}\`!` });
    else if (custom) await interaction.editReply({ content: `Úspěšně jsi verifikoval ${user} na \`${username}\`!` });
    else await interaction.editReply({ content: `Změnil sis jméno z \`${verified[0].nickname}\` na \`${username}\`!` });

   /* if (language.match(/cz|sk/i)) uhg.mongo.run.post("stats", "stats", api.hypixel)*/ // pridat potvrzeni do admin chatu - Farmans

   uhg.dc.client.channels.cache.get('548772550386253824').send({ content: `${custom?'Custom ':''}Verify: ${user || username} - ${language} (temp msg)`, allowedMentions: { parse: [] } })
   

}