// import requirements 
const {
    Client,
    Intents,
    MessageEmbed,
} = require('discord.js');

// starting in djs v13, we are required to specify which intents we are using in the client constructor
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const dotenv = require('dotenv')
// import config IDs
dotenv.config()
const TOKEN = process.env.TOKEN

const startup = require('./src/startup');
// run this script upon starting up the bot and pass in the client
startup(client)


var cache = new Map();
const { request } = require('./src/handlers/cache')

client.on('interactionCreate', async (interaction) => {
    // define constants
    const guild = client.guilds.cache.get(interaction.guild.id)
    const member = interaction.member

    // define roles needed for interaction
    const cakeRole = guild.roles.cache.find(r => r.name == 'Cakeist')
    const breadRole = guild.roles.cache.find(r => r.name == 'Breadible')
    const cookieRole = guild.roles.cache.find(r => r.name == 'Cookier')
    const pieRole = guild.roles.cache.find(r => r.name == 'Piefessional')

    if (interaction.isButton()) {
        const commandName = interaction.customId;
        var Embed = new MessageEmbed()
            .setColor('#00000')
            .setTitle('Base Embed')
            .setDescription('Base Description')
            .setThumbnail('https://www.videogameschronicle.com/files/2021/05/discord-new-logo.jpg')

        // check button clicked by customID
        if (commandName == 'cake') {

            member.roles.remove(cookieRole)
            member.roles.remove(pieRole)
            member.roles.remove(breadRole)

            Embed.setColor('#F9D7D3')
            Embed.setTitle('Cake')
            Embed.setDescription('You are now a Cakeist!')
            Embed.setThumbnail('https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80')
            member.roles.add(cakeRole)
            return interaction.reply({
                //content: 'You are now a Cakeist!',
                ephemeral: true,
                embeds: [Embed]
            })
        }
        if (commandName == 'bread') {
            member.roles.remove(cookieRole)
            member.roles.remove(pieRole)
            member.roles.remove(cakeRole)

            Embed.setColor('#FFDB69')
            Embed.setTitle('Bread')
            Embed.setDescription('You are Breadible!')
            Embed.setThumbnail('https://media.istockphoto.com/photos/heap-of-bread-picture-id995038782?k=20&m=995038782&s=612x612&w=0&h=40HBdtHiBgOESo870LBOgc6xUt1E3bqhOhqPCXZTNbc=')
            member.roles.add(breadRole)
            interaction.reply({
                //content: 'You are now Breadible!',
                ephemeral: true,
                embeds: [Embed]
            })
        }
        if (commandName == 'cookie') {
            member.roles.remove(cakeRole)
            member.roles.remove(pieRole)
            member.roles.remove(breadRole)

            Embed.setColor('#9D7E67')
            Embed.setTitle('Cookie')
            Embed.setDescription('You are now a Cookier!')
            Embed.setThumbnail('https://media.istockphoto.com/photos/chocolate-chip-cookies-on-white-picture-id174478330?k=20&m=174478330&s=612x612&w=0&h=HV4GKTIxX0WeiiANz7NzfpB3LJM0J5RYVm4lNgxHZGc=')
            member.roles.add(cookieRole)
            return interaction.reply({
                //content: 'You are now a Cookier!',
                ephemeral: true,
                embeds: [Embed]
            })
        }
        if (commandName == 'pie') {
            member.roles.remove(cookieRole)
            member.roles.remove(cakeRole)
            member.roles.remove(breadRole)

            Embed.setColor('#D7153B')
            Embed.setTitle('Pie')
            Embed.setDescription('You are now a Piefessional!')
            Embed.setThumbnail('https://media.istockphoto.com/photos/whole-cherry-pie-picture-id535475493?k=20&m=535475493&s=612x612&w=0&h=ngm0JH2iWO2Tzv5mM05qXsCpZGMriJabNX3tGXcwY0I=')
            member.roles.add(pieRole)
            return interaction.reply({
                //content: 'You are now a Piefessional!'
                ephemeral: true,
                embeds: [Embed]
            })
        }
    }

    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        if (command == 'start' || command == 'setup') {
            console.log('ran a non-baking command')
            return await command.execute(client, interaction)
        } else {

            return await request(client, interaction, cache)
        }

    }
})
client.login(TOKEN);