const { MessageEmbed, MessageButton, MessageActionRow, CommandInteraction } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");
const client = require("../../utils/client");

module.exports = {
    id: "test",
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async (uhg, interaction) {
        const modal = new Modal()
        .setCustomId('test-modal')
        .setTitle('TEST')
        .addComponents(
            new TextInputComponent()
            .setCustomId('test-modal')
            .setLabel('TEST')
            .setStyle('SHORT')
            .setMinLength(1)
            .setMaxLength(2)
            .setPlaceholder("Provide the test.")
            .setRequired(true)
        );

        showModal(modal, {
            client: client
        })
    }
}