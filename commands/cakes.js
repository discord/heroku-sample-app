const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed,
} = require('discord.js')

const api = require('../src/handlers/oven')
const rng = require('../src/handlers/rng')
const wait = require('util').promisify(setTimeout)

module.exports = {
    name: "cakes",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('cakes')
        .setDescription('bake cakes')
        .addSubcommand(subcommand =>
            subcommand
                .setName('beginner')
                .setDescription('Bake an easy cake'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('intermediate')
                .setDescription('Bake a medium difficulty cake'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('master')
                .setDescription('Challenge yourself with these cake!')),

    async execute(client, interaction, cache) {
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
        var initCache = cache.get(member.id);

        var embed = new MessageEmbed()
            .setColor('#F9D7D3')

        const quality = async function oven() {
            switch (interaction.options.getSubcommand()) {
                // which cake subcommand was clicked
                case 'beginner':
                    var level = 1

                    var cake = await api.bake("cake")
                    embed
                        .setDescription(`Baking a ${cake}..`)
                        .setImage('https://c.tenor.com/QRcg6MWw9_kAAAAd/make-a-cake-lets-make-a-cake.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cake}**!`)
                        .setImage("https://media2.giphy.com/media/13ilKVAcAp21wY/200.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    return quality
                    break;

                case 'intermediate':
                    var level = 2
                    var cake = await api.bake("cake")
                    embed
                        .setDescription(`Baking a ${cake}..`)
                        .setImage('https://img.buzzfeed.com/buzzfeed-static/static/2017-08/15/9/asset/buzzfeed-prod-fastlane-01/anigif_sub-buzz-7246-1502803286-3.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cake}**!`)
                        .setImage("https://c.tenor.com/i5mPxsay-1sAAAAM/cake-big-slice.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    return quality
                    break;

                case 'master':
                    var level = 3
                    var cake = await api.bake("cake")
                    embed
                        .setDescription(`Baking a ${cake}..`)
                        .setImage('https://i.chzbgr.com/full/9483404800/h54C1913E/packaged-goods')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cake}**!`)
                        .setImage("https://c.tenor.com/WbC1fgY8xhwAAAAM/slice-of-cake-bigger-bolder-baking.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    return quality
                    break;
            }
        }
        await quality().then((value) => {
            if (value == 'ruined' || value == 'poor' || value == 'gross') {
                initCache--;
                cache.set(member.id, initCache)
            } else if (value == 'burnt' || value == 'defiled' || value == 'desecrated' || value == "terrible") {
                const xp = initCache - 2;
                cache.set(member.id, xp);
            } else if (value == 'perfect' || value == 'golden') {

                const xp = initCache + 7;
                cache.set(member.id, xp);
            } else if (value == 'amazing' || value == 'great' || value == 'glorious') {
                const xp = initCache + 2;
                cache.set(member.id, xp);
            } else {
                initCache++;
                cache.set(member.id, initCache);
            }

            var checkCache = cache.get(member.id);
            var res = new MessageEmbed()
                .setDescription(`You have **${checkCache}** baker points!\n
            Bake higher quality pastries for more points! \n Be careful though, lower quality pastries means you lose points.`)

            interaction.channel.send({
                content: `<@${interaction.member.id}>`,
                embeds: [res]
            })

        })
    }
}