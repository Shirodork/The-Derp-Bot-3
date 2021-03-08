const dogFacts = require('../../assets/json/dogfacts.json');
const Command = require('../../structures/Command.js');

module.exports = class DogFacts extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dogfacts',
			dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            aliases: ['dogfact', 'dogf'],
			description: 'Grab a random dog fact!',
			usage: 'dogfacts',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {

        // New Embed
			const embed = new MessageEmbed()										
            .setTitle(message.translate(settings.Language, 'FUN/DOG_TITLE'))	// Title
            .setColor('RANDOM')													// Color
            .setDescription(dogFacts[Math.floor(Math.random() * dogFacts.length)])									// Grab Chosen Fact
        
        // Send Message
        message.channel.send(embed);
    
	}
};