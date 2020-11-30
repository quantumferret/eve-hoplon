# eve-hoplon
A discord bot that will authenticate new members joining an Eve corporation's discord server through the EVE SSO authentication flow.

Very much a work in progress at this point, and a bit messy. Refactoring to further separate business and data logic is
currently next on my to-do list.

This project is largely for fun and to improve at various aspects of (web) programming, but it could have some utility
to Eve corporations if/when finished and properly deployed... There is a dearth of lightweight options for
EVE corporations (smaller ones in particular, e.g. a membership count in the low hundreds or less) looking for a Discord
bot capable of automating server roles and privileges that is smoothly integrated with the Eve SSO authentication flow.
Current options are either locked behind an (in-game currency) paywall and not open-source, or require a fair amount of
setup by the user.

### Run
This repository hasn't really been set up to be run by someone else, yet. There are many excellent guides for how to add
a bot to a server, create a bot, etc.

To start the server and actually use it, you'll need a bot token of your own, as well as an Eve developer
account with an associated client id, secret key, and callback URL for Eve Online's authentication flow. If you've obtained
all of that and created the .env and config.json files the program gets those values from, then follow the steps below.

To run locally:
1. `git clone https://github.com/quantumferret/eve-hoplon.git`
2. `npm i`
3. `npm run start`
    This will start the server and bot with hot-reloading enabled.
    
Eventually, when this project is closer to the finish line, it will be hosted on a remote server, and one will simply need
to add the bot to a server to try it out, and for developers, starter configuration files that will be provided for local
development.