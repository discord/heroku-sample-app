module.exports = {

    async request(client, interaction, cache) {
        const command = client.commands.get(interaction.commandName);

        // set by user id
        const key = (interaction.user.id);
        // look for cache by user id
        var initCache = cache.get(key);

        // check if the user has run a cmd before
        if (initCache) {
            //incr cmd 
            return await command.execute(client, interaction, cache)
        } else {
            // if not set the cmd counter to 1
            cache.set(key, 1)
            return await command.execute(client, interaction, cache)
        }

    }
}