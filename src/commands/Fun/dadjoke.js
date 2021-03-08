const Command = require('../../structures/Command.js'),
    fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
    dadAPI = 'https://icanhazdadjoke.com/slack'

module.exports = class DadJoke extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dadjoke',
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			aliases: ['dadj', 'dadjokes'],
			description: 'Grab a random Dad Joke!',
			usage: 'dadjoke',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {

<<<<<<< Updated upstream
        // Fetch Dad Joke and convert to JSON
        const dadjoke = await fetch(dadAPI)
=======
        let options = {
            headers: {
                'User-Agent': 'TheDerpBot3.0'
            },
            json: true
        };

        const dadjoke = await fetch(dadAPI, options)
>>>>>>> Stashed changes
			.then(res => res.json()
				.catch((err) => {
					if (message.deletable) message.delete();																// Delete User Message
					bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
					return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	    // Error Message
				}));


		// New Embed
		const embed = new MessageEmbed()
			.setTitle(message.translate(settings.Language, 'FUN/DAD_TITLE'))	// Title
			.setColor('RANDOM')													// Color
<<<<<<< Updated upstream
			.setDescription(dadjoke.joke)									    // Grab Chosen Fact
=======
			.setDescription(dadjoke.attachments[0].text)									// Grab Chosen Fact
>>>>>>> Stashed changes

		// Send Message
		message.channel.send(embed);

	}
};