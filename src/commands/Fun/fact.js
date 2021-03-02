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
module.exports = class Fact extends Command {
	
	// Command Construct
	constructor(bot) {
		super(bot, {
			name: 'fact',
			dirname: __dirname,
			aliases: ['facts'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Receive a random fact.',
			usage: 'fact',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {

		// Grab Random Facts JSON
		fs.readFile('./src/assets/json/random-facts.json', (err, data) => {

			// Error Catcher
			if (err) {
				if (message.deletable) message.delete();															
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
				return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
			}

			// Retrieve a random fact
			const facts = JSON.parse(data);											// Separate JSON contents
			const num = (Math.floor((Math.random() * facts.facts.length) + 0));		// Get a random number (within JSON size)
			
			// New Embed
			const embed = new MessageEmbed()										
				.setTitle(message.translate(settings.Language, 'FUN/FACT_TITLE'))	// Title
				.setColor('RANDOM')													// Color
				.setDescription(facts.facts[num]);									// Grab Chosen Fact
			
			// Send Message
			message.channel.send(embed);
		});
	}
};
