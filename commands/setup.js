const {
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ButtonBuilder
} = require('discord.js');

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

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cake')
                    .setLabel('Cakeist')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bread')
                    .setLabel('Breadible')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cookie')
                    .setLabel('Cookier')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new ButtonBuilder()
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