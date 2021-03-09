const catFacts = require('../../assets/json/catfacts.json'),
	Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js')

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
	async run(bot, message, args, settings) {

		// New Embed
		const embed = new MessageEmbed()
			.setTitle(message.translate(settings.Language, 'FUN/CAT_TITLE'))	// Title
			.setColor('RANDOM')													// Color
			.setDescription(catFacts[Math.floor(Math.random() * catFacts.length)])									// Grab Chosen Fact

		// Send Message
		message.channel.send(embed);

	}
};