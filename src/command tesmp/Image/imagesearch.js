// Dependencies
const { image_search } = require('duckduckgo-images-api'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class ImageSearch extends Command {
	constructor(bot) {
		super(bot, {
			name: 'imagesearch',
			dirname: __dirname,
			aliases: ['img'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Finds an image based on the topic.',
			usage: 'imagesearch <topic>',
			cooldown: 2000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		// Make sure a topic was included
		if (!args[0]) {
			if (message.deletable) message.delete();
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}

		const results = await image_search({ query: args.join(' '), moderate: (message.channel.nsfw || message.channel.type == 'dm') ? false : true, iterations: 2, retries: 2 });

		// send image
		const embed = new MessageEmbed()
			.setImage(results[Math.floor(Math.random() * 101)].image);
		message.channel.send(embed);
	}
};
