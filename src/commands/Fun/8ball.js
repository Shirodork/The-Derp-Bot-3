// Dependencies
const fs = require('fs'),
Command = require('../../structures/Command.js'),
    { MessageEmbed } = require('discord.js')

// Command Export
module.exports = class EightBall extends Command {
	constructor(bot) {
		super(bot, {
			name: '8ball',
			dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            aliases: ['eightball'],
			description: 'Consult the wisdom of 8-Ball',
			usage: '8-ball <question>',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, settings) {

		// Get the random facts file
		fs.readFile('./src/assets/json/8ball.json', (err, data) => {
			if (err) {
				if (message.deletable) message.delete();
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
				return message.channel.error(settings.Language, 'ERROR_MESSAGE', err.message).then(m => m.delete({ timeout: 5000 }));
			}

			const facts = JSON.parse(data);
			const num = (Math.floor((Math.random() * facts.response.length) + 0));
		const embed = new MessageEmbed()
			.setTitle(bot.translate(settings.Language, 'FUN/EIGHT_TITLE'))	// Title
			.setColor('RANDOM')													// Color
			.setDescription(facts.response[num])									// Grab Chosen Fact

		// Send Message
		message.channel.send(embed);

		});
	}
};
