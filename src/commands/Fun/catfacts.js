const fs = require('fs'),
	Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class CatFacts extends Command {
	constructor(bot) {
		super(bot, {
			name: 'catfacts',
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			aliases: ['catfact', 'catf'],
			description: 'Grab a random cat fact!',
			usage: 'catfacts',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, settings) {

		// Get the random facts file
		fs.readFile('./src/assets/json/catfacts.json', (err, data) => {
			if (err) {
				if (message.deletable) message.delete();
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
				return message.channel.error(settings.Language, 'ERROR_MESSAGE', err.message).then(m => m.delete({ timeout: 5000 }));
			}

			const facts = JSON.parse(data);
			const num = (Math.floor((Math.random() * facts.facts.length) + 0));
		const embed = new MessageEmbed()
			.setTitle(bot.translate(settings.Language, 'FUN/CAT_TITLE'))	// Title
			.setColor('RANDOM')													// Color
			.setDescription(facts.facts[num])									// Grab Chosen Fact

		// Send Message
		message.channel.send(embed);

		});
	}
};