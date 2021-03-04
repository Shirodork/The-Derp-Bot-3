/**
 * Command: Fact
 * Summary: Requests a single fact from a pre-created JSON (Over 1000 facts)
 * Useage: [prefix] fact
 */

// Constant Dependencies
const fs = require('fs'),								// NodeJS File System Heper
	{ MessageEmbed } = require('discord.js'),			// DiscordJS
	Command = require('../../structures/Command.js');	// Command Handler

// Command Class Createion
module.exports = class heavenorhell1 extends Command {
	
	// Command Construct
	constructor(bot) {
		super(bot, {
			name: 'heavenorhell1',
			dirname: __dirname,
			aliases: ['hh1'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Receive a random fact.',
			usage: 'fact',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {

        

		// Grab Random Facts JSON
		fs.readFile('./src/assets/json/subreddits.json', (err, data) => {

			// Error Catcher
			if (err) {
				if (message.deletable) message.delete();															
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
				return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
			}

			// Retrieve a random fact
			const subreddits = JSON.parse(data);											// Separate JSON contents
			const num = (Math.floor((Math.random() * subreddits.subreddit.length) + 0));		// Get a random number (within JSON size)
			const subreddit = subreddits.subreddit[num]

            var responses = [
                `You see a portal. You decide to hop in. On the other side, you find yourself in **r/${subreddit}**`,
                `You have rolled the dice! Your fate has been sealed. The subreddit given to you by destiny is: **r/${subreddit}**`,
                `You’re on the run from space pirates! As a last resort, you enter a dimensional wormhole. Alas, you find yourself in **r/${subreddit}**`,
                `You’re enjoying an icecream when all of a sudden a canvas bag is put over you. You’ve been kidnapped! Hours later you are dumped in **r/${subreddit}**`,
                `You’re enjoying your day when Thanos appears beside you. He picks you up and **YEETS** you into **r/${subreddit}**`,
                `You’re at a party. You take a huge hit from the public bong. You start tripping out in **r/${subreddit}**`,
                `You’re standing beside a phonebooth when the phone suddenly rings. You answer the phone and suddenly you awaken, realizing you were stuck in the matrix. The real world is actually **r/${subreddit}**`,
                `You’re walking down the stairs when suddenly you trip and die. Your afterlife is constant exposure to **r/${subreddit}**`,
                `You decide that life isn’t worth living anymore. You off yourself. You now spend eternity in **r/${subreddit}**. Was it worth it?`,
                `You’re fighting along side Wraith. She sets up a portal. You enter, but **Oh No!**, its malfunctioned. You find yourself stuck in **r/${subreddit}**`,
                `All dogs go to heaven, but not you! You’re going to **r/${subreddit}**!`,   
                ]
            
                // Choose random response
                var botResponse = responses[Math.floor(Math.random() * responses.length)];
        
                getSubreddit(subreddit)
			// New Embed
			const embed = new MessageEmbed()
			.setTitle(botResponse)
			.setDescription("Posted by: " + subreddit.data.author)
			.setColor(color(colors))
			.setThumbnail(poke1.sprites.front_default)
			.setAuthor('The ' + poke2.genera.find(e => e.language.name === 'en').genus, pokeDex)
			.setFooter('Information Gathered from PokeAPI and Bulbapedia')
			
			// Send Message
			message.channel.send(embed);
		});


    }
}

async function getSubreddit(subreddit){
    const subredditJSON = await fetch(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`)
			.then(res => res.json()
				.catch((err) => {
					// No Pokemon/Error
					if (message.deletable) message.delete();																// Delete User Message
					bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
					return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
				}));

                console.log(subredditJSON)

                return subredditJSON
}
