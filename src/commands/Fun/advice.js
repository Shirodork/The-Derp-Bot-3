/**
 * Command: Advice
 * Summary: Requests a single peice of advice from the Adviceslip API
 * Useage: [prefix] advice
 */

// Dependencies
const fetch = require('node-fetch'),					// HTTP Fetcher
	Command = require('../../structures/Command.js'),	// Command Handler
	{ MessageEmbed } = require('discord.js');

	// Class creation and help export
module.exports = class Advice extends Command {
	
	// Command Help Contents
	constructor(bot) {
		super(bot, {
			name: 'advice',
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get some random advice',
			usage: 'advice',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		try {
			const adviceJSON = await fetch('https://api.adviceslip.com/advice').then(res => res.json());	// Grab JSON from API Request

			// Create Embed
			const embed = new MessageEmbed()
			.setAuthor(`My advice to you, ${message.author.tag}:`)
			.setColor('RANDOM')
			.setThumbnail(bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 256 }))
			.setDescription(`"${adviceJSON.slip.advice}"`)
			.setTimestamp()
			.setFooter(message.translate(settings.Language, 'GUILD/INFO_FOOTER', message.author.tag));

			// Send Embed
			message.channel.send(embed);

		// Error catching
		} catch (err) {
			if (message.deletable) message.delete();													// Delete User Message
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);				// Log error in Console
			message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	// Send Error Message to Channel
		}
	}
};
