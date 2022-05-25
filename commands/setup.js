const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageActionRow,
    MessageButton
} = require('discord.js')


module.exports = {
    name: "setup",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Select Bakery Roles'),

    async execute(client, interaction) {
        const member = interaction.member
        const guild = client.guilds.cache.get(interaction.guild.id)

        const roles = guild.roles.cache
        const cakeRole = roles.find(role => role.name == "Cakeist");
        const breadRole = roles.find(role => role.name == "Breadible");
        const cookieRole = roles.find(role => role.name == "Cookier");
        const pieRole = roles.find(role => role.name == "Piefessional");

        if (!cakeRole || !breadRole || !cookieRole || !pieRole) {
            return interaction.reply({
                content: `Missing a role! Run \`\`/start\`\` first!`
            })
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cake')
                    .setLabel('Cakeist')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('bread')
                    .setLabel('Breadible')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('cookie')
                    .setLabel('Cookier')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('pie')
                    .setLabel('Piefessional')
                    .setStyle('SECONDARY'),
            )

        await interaction.reply({
            content: 'Select a role',
            components: [row]
        })

    }
}