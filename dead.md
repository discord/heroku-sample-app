## Project structure

```
├── commands        -> sample commands
│   ├── breads.js
│   ├── cakes.js
│   ├── cookies.js
│   ├── pies.js
│   ├── createRoles.js
│   ├── setup.js
├── .env            -> sample .env file
├── index.js        -> main entrypoint for app
├── src    
│   ├── startup.js  -> slash command payload
│   ├── handlers    -> utility functions
│   │   ├── rng.js
│   │   ├── cache.js
│   │   ├── oven.js
├── Procfile        -> heroku start
├── package.json
├── README.md
└── .gitignore
```

## Features

- Bakes bread (with varying degrees of success)
- Basic slash command handling
- Caching system

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Discord.JS v13](https://discord.js.org/#/)
- [Discord-api-types](https://www.npmjs.com/package/discord-api-types)
- [@Discord.JS REST](https://www.npmjs.com/package/@discordjs/rest)
- [dotenv](https://www.npmjs.com/package/dotenv)


## Getting Started

First, make sure you have all the required modules and dependencies then continue with the following steps.

### Installation

```bash
# Clone the respository
git clone https://github.com/jcheonsa/baker-bot

# Enter into the directory
cd /baker-bot

# Install the dependencies
npm install .
```
1) open/create the .env in Baker-bot's root directory
2) configure the `GUILD_ID` and `CLIENT_ID`
3) `npm install` will install all dependencies located in the package.json in a folder called node_modules

### Configuration
After cloning the project and installing all of the dependencies, you're going to need to add your Discord API `TOKEN` in the `.env` file as well.

Your `.env` should include the following for this bot to operate properly:
```
TOKEN=
GUILD_ID=
CLIENT_ID=
```

https://discord.com/developers/applications to create your own Baker-bot clone and get your token.

OAuth NOTE: Ensure that your app has the appropriate scopes for `application.commands` and `bot`.

## Heroku

```bash
# Procfile contents (startup)
worker node index.js
```
The script in your `Procfile` will vary depending on what language you're coding in.