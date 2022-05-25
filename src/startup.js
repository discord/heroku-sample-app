const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const fs = require('fs')

module.exports = (client) => {

    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    // Creating a collection for commands in client
    client.commands = new Collection();

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }

    // When the client is ready, this only runs once
    client.once('ready', async () => {
        console.log(`${client.user.tag} is now online!`);

        // Registering the commands in the client
        const rest = new REST({
            version: '9'
        }).setToken(TOKEN);
        (async () => {
            try {
                if (GUILD_ID == "global") {
                    await rest.put(
                        Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                    );
                    console.log('Successfully registered application commands globally');
                } else {
                    await rest.put(
                        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                        body: commands
                    },
                    );
                    console.log('Successfully registered application commands for development guild');
                }
            } catch (error) {
                if (error) console.error(error);
            }
        })();

    });

}