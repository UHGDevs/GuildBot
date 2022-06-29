const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Modal, TextInputComponent, showModal, MessageSelectMenu } = require("discord.js");

exports.send = async (uhg, interaction) => {
    const modal = new Modal().setCustomId('get_modal_verify').setTitle('UHG Verifikace');
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
    modal.addComponents(components)
    await interaction.showModal(modal);
}

exports.get = async (uhg, interaction) => {
    console.log(interaction.fields.getTextInputValue('modal_verfiy_username'))
    console.log(interaction.fields.getTextInputValue('modal_verfiy_language'))
    await interaction.reply({ content: 'Your submission was recieved successfully!\nstill, it doesn\'t work yet...', ephemeral: true });
}