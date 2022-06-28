const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction, Modal, TextInputComponent, showModal, MessageSelectMenu } = require("discord.js");

module.exports = async (uhg, interaction) => {
    console.log('we are in')
    const modal = new Modal()
    .setCustomId('verify_modal')
    .setTitle('UHG Verifikace');

    const usernameInput = new MessageActionRow().addComponents(new TextInputComponent()
        .setCustomId('modal_test_username')
        .setLabel("Username:")
        .setStyle('SHORT'));
    const languageInput = new MessageActionRow()
        .addComponents(new MessageSelectMenu()
        .setCustomId('modal_test_language')
        .setPlaceholder('Select language')
        .addOptions([
                {
                    label: 'CZECH',
                    description: '',
                    value: 'czech',
                },
                {
                    label: 'SLOVAK',
                    description: '',
                    value: 'slovak',
                },
                {
                    label: 'ENGLISH',
                    description: 'Or any other language',
                    value: 'english',
                },
            ]),
    );
   
modal.addComponents(usernameInput, languageInput);
// Show the modal to the user
await interaction.showModal(modal);
}