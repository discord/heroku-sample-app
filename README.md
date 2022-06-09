# Heroku example app

Baker bot is a sample app that lets you bake bread inside the oven that is Discord.

This repo is sample code for the [Heroku deployment tutorial](https://discord.com/developers/docs/tutorials/hosting-on-heroku)

![bread](./src/img/heroku-baking.gif)

## Features and technologies used

- [Slash commands](https://discord.com/developers/docs/interactions/application-commands)
- [Interactive buttons](https://discord.com/developers/docs/interactions/message-components#buttons)
- [Discord.JS v13](https://discord.js.org/#/)
- [Heroku](https://www.heroku.com/)

---

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
│   ├── img
│   ├── handlers    -> utility functions
│   │   ├── rng.js
│   │   ├── cache.js
│   │   ├── oven.js
├── Procfile        -> heroku start
├── package.json
├── README.md
└── .gitignore
```

## Configuring your Discord app

Before starting, you'll need a [Discord app](https://discord.com/developers/applications) with the following permissions:

- `bot` scope (after your bot user is enabled) with the `Manage Roles` permission
- `applications.commands` scope
  
> ⚙️ Permissions can be configured by clicking on the OAuth2 tab and using the URL Generator. After a URL is generated, you can install the app by pasting that URL into your browser and following the installation flow.

## Configure Heroku

Next you'll need to configure Heroku:

- [Log in](https://id.heroku.com/login) to your account, or [set up a new one](https://signup.heroku.com/)
- Create a new app on Heroku

![create Heroku app](./src/img/heroku-login.png)

### Connect to Github

Next, you can configure deploys with Github. If you prefer to deploy without using Github, you can read [Heroku's deployment documentation](https://devcenter.heroku.com/categories/deployment).

- In the **Deploy** tab, select the option to **Connect this app to GitHub**

![add Github to Heroku app](./src/img/heroku-connectGH.png)

- Select the branch you want to deploy your app from

![deploy Heroku app](./src/img/heroku-deploy.png)

> 💡 You can only connect Heroku apps to a single GitHub repository

### Add Discord credentials

Before your app can go online, you'll have to configure your Heroku environment with your Discord bot's credentials:

Add your bot’s `TOKEN`, `GUILD_ID`, `CLIENT_ID`, and any other credentials your bot might need. More details on credentials for Baker bot can be found in [the tutorial](https://discord.com/developers/docs/tutorials/hosting-on-heroku).

![Heroku config variables](./src/img/heroku-configVars.png)

### Add a buildpack

Next, add a Heroku buildpack to your app. Click **add a buildpack to your app** and configure it for NodeJS.

![Adding a buildpack](./src/img/heroku-buildpack.png)

## Next steps

More information about all of the configuration steps as well as guidance on maintaining and monitoring your app can be found in [the tutorial](https://discord.com/developers/docs/tutorials/hosting-on-heroku).

If you run into any problems, feel free to [open an issue](https://github.com/discord/heroku-sample-app/issues) in this repo.
