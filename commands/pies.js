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
    name: "pies",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('pies')
        .setDescription('bake pies')
        .addSubcommand(subcommand =>
            subcommand
                .setName('beginner')
                .setDescription('Bake an easy pie'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('intermediate')
                .setDescription('Bake a medium difficulty pie'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('master')
                .setDescription('Challenge yourself with these pies!')),

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
            .setColor('#D7153B')

        const quality = async function oven() {
            switch (interaction.options.getSubcommand()) {
                // which pie subcommand was clicked
                case 'beginner':
                    var level = 1

                    var pies = await api.bake("pie")
                    embed
                        .setDescription(`Baking a ${pies}..`)
                        .setImage("https://thumbs.gfycat.com/EssentialSnappyIaerismetalmark-max-1mb.gif")
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${pies}**!`)
                        .setImage("https://media2.giphy.com/media/1wpxLzIWG4HravDjo8/giphy.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })


                    break;

                case 'intermediate':
                    var level = 2
                    var pies = await api.bake("pie")
                    embed
                        .setDescription(`Baking a ${pies}..`)
                        .setImage("https://c.tenor.com/JtKl5fL9YJoAAAAd/applepie-weaving.gif")
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${pies}**!`)
                        .setImage("https://c.tenor.com/Fh39sGvwA9gAAAAd/apple-pie-dessert.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    break;

                case 'master':
                    var level = 3
                    var pies = await api.bake("pie")
                    embed
                        .setDescription(`Baking a ${pies}..`)
                        .setImage("http://3.bp.blogspot.com/-6IijCPOnpzE/VntKkQzUIlI/AAAAAAAAPK4/_OzWPYhzvFg/s1600/baking.gif")
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${pies}**!`)
                        .setImage("https://c.tenor.com/SNiDl1eNY-MAAAAC/pumpkin-pie-joshua-weissman.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
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