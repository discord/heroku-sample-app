const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "start",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Setup game'),

    async execute(client, interaction) {
        const member = interaction.member
        const guild = client.guilds.cache.get(interaction.guild.id)

        const bakerRole = guild.roles.cache.find(r => r.name == "Baker")
        const cakeRole = guild.roles.cache.find(role => role.name == "Cakeist");
        const breadRole = guild.roles.cache.find(role => role.name == "Breadible");
        const cookieRole = guild.roles.cache.find(role => role.name == "Cookier");
        const pieRole = guild.roles.cache.find(role => role.name == "Piefessional");
        const glutenRole = guild.roles.cache.find(role => role.name == "Gluten-Free")

        var embed = new MessageEmbed()
            .setTitle(`Set up Baker`)

        var arr = [];
        try {
            if (!bakerRole) {
                guild.roles.create({
                    name: 'Baker',
                    color: '6968ae',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Baker role: ❌`)
            } else arr.push(`Create Baker role: ✅`)

            if (!cakeRole) {
                guild.roles.create({
                    name: 'Cakeist',
                    color: 'F9D7D3',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Baker role: ❌`)
            } else arr.push(`Create Cake role: ✅`)

            if (!breadRole) {
                guild.roles.create({
                    name: 'Breadible',
                    color: 'FFDB69',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Bread role: ❌`)
            } else arr.push(`Create Bread role: ✅`)

            if (!cookieRole) {
                guild.roles.create({
                    name: 'Cookier',
                    color: '9D7E67',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Cookier role: ❌`)
            } else arr.push(`Create Cookier role: ✅`)

            if (!pieRole) {
                guild.roles.create({
                    name: 'Piefessional',
                    color: 'd7153b',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Pie role: ❌`)
            } else arr.push(`Create Pie role: ✅`)

            if (!glutenRole) {
                guild.roles.create({
                    name: 'Gluten-Free',
                    color: 'B0A394',
                    reason: 'Initial setup.',
                }).catch(console.error).then(role => {
                    console.log(role)
                })
                arr.push(`Create Gluten role: ❌`)
            } else arr.push(`Create Gluten role: ✅`)


        } catch (e) {
            console.log(e)
        } finally {
            var text = arr.toString().split(',').join('\n');
            embed
                .setDescription(text)

            await interaction.reply({
                content: `Bakery Bois`,
                embeds: [embed]
            })
        }
    }
}