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
    name: "cookies",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('cookie')
        .setDescription('bake cookies')
        .addSubcommand(subcommand =>
            subcommand
                .setName('beginner')
                .setDescription('Bake an easy cookie'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('intermediate')
                .setDescription('Bake a medium difficulty cookie'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('master')
                .setDescription('Challenge yourself with these cookies!')),

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
            .setColor('#9D7E67')

        const quality = async function oven() {
            switch (interaction.options.getSubcommand()) {
                // which cookie subcommand was clicked
                case 'beginner':
                    var level = 1

                    var cookie = await api.bake("cookie")
                    embed
                        .setDescription(`Baking a ${cookie}..`)
                        .setImage('https://c.tenor.com/lHkn3Equu0cAAAAC/cookie-baking.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cookie}**!`)
                        .setImage("https://c.tenor.com/tODkZYgu_U0AAAAM/chocolate-chip-cookies-bake-goods.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    break;

                case 'intermediate':
                    var level = 2
                    var cookie = await api.bake("cookie")
                    embed
                        .setDescription(`Baking a ${cookie}..`)
                        .setImage('https://c.tenor.com/U-2S266E9FgAAAAC/oven-cookies.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cookie}**!`)
                        .setImage("https://images.squarespace-cdn.com/content/v1/579107bc579fb3d29bbf8014/1557793179162-AKQ322QGUIVKFB3S5T6M/giphy.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    break;

                case 'master':
                    var level = 3
                    var cookie = await api.bake("cookie")
                    embed
                        .setDescription(`Baking a ${cookie}..`)
                        .setImage('https://i.pinimg.com/originals/a0/af/e2/a0afe21d7dc949ff6a17817b5d09553b.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${cookie}**!`)
                        .setImage("https://c.tenor.com/TqLDy199RTkAAAAM/chocolate-chip-cookies-cookies.gif")
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