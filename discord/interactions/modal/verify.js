const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Modal, TextInputComponent, showModal, MessageSelectMenu } = require("discord.js");

exports.send = async (uhg, interaction) => {
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
                    label: 'Your language: (cz/sk/en)',
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
    const modal = new Modal().setCustomId('get_modal_verify').setTitle('UHG Verifikace');
    modal.addComponents(components)

    await interaction.showModal(modal);
}

exports.get = async (uhg, interaction) => {
    let username = interaction.fields.getTextInputValue('modal_verfiy_username')
    let language = (interaction.fields.getTextInputValue('modal_verfiy_language') || '').toLowerCase()
    console.log(username)
    console.log(language)
    if (language !== 'cz' || language !== 'sk' || language !== 'en') return interaction.reply({ content: 'Invalid language! CZ/SK/EN', ephemeral: true })
    
    await interaction.reply({ content: 'Your verification was recieved successfully!\nstill, it doesn\'t work yet...', ephemeral: true });
}