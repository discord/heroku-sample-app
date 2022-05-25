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
    name: "breads",
    timeout: 5,
    data: new SlashCommandBuilder()
        .setName('breads')
        .setDescription('bake breads')
        .addSubcommand(subcommand =>
            subcommand
                .setName('beginner')
                .setDescription('Bake an easy bread'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('intermediate')
                .setDescription('Bake a medium difficulty bread'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('master')
                .setDescription('Challenge yourself with these breads!')),

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
            .setColor('#FFDB69')

        const quality = async function oven() {
            switch (interaction.options.getSubcommand()) {
                // which bread subcommand was clicked
                case 'beginner':
                    var level = 1

                    var bread = await api.bake("bread")
                    embed
                        .setDescription(`Baking a ${bread}..`)
                        .setImage('https://i.pinimg.com/originals/ba/86/91/ba8691952c649c3526ba9bbcbe835406.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${bread}**!`)
                        .setImage('https://64.media.tumblr.com/bd0e2e49db088732a1dbf4922706e3e7/tumblr_piibpfuWqY1xzutogo2_400.gifv')
                    interaction.editReply({
                        embeds: [embed]
                    })
                    return quality
                    break;

                case 'intermediate':
                    var level = 2
                    var bread = await api.bake("bread")
                    embed
                        .setDescription(`Baking a ${bread}..`)
                        .setImage('https://i.makeagif.com/media/3-28-2018/hrn8ex.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${bread}**!`)
                        .setImage("https://ctkpro.s3.amazonaws.com/wp-content/uploads/2021/05/28213000/bread.gif")
                    interaction.editReply({
                        embeds: [embed]
                    })
                    return quality
                    break;

                case 'master':
                    var level = 3
                    var bread = await api.bake("bread")
                    embed
                        .setDescription(`Baking a ${bread}..`)
                        .setImage('https://i.pinimg.com/originals/4b/4b/a2/4b4ba2cd27d09ea2fff4ff84ab27eda5.gif')
                    interaction.reply({
                        embeds: [embed]
                    })
                    await wait(1000 * 5)

                    var quality = await rng.calculate(level)

                    embed
                        .setDescription(`Finished baking a ${quality} **${bread}**!`)
                        .setImage("https://i.chzbgr.com/full/9565004544/hA6FDAED0/food")
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