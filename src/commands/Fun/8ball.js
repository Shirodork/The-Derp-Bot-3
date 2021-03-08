// Dependencies
const Command = require('../../structures/Command.js');

// Command Export
module.exports = class EightBall extends Command {
	constructor(bot) {
		super(bot, {
			name: 'eightball',
			dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            aliases: ['8ball'],
			description: 'Consult the wisdom of 8-Ball',
			usage: '8-ball <question>',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		if (!args[0]) {
			if (message.deletable) message.delete();	// Delete Message
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
        }
        
        // 8 Ball Responses (TO BE MOVED TO LANGUAGE FILE)
        var responses =
        [
          'Maybe.',
          'Certainly not.',
          'I hope so.',
          'Not in your wildest dreams.',
          'You may rely on it.',
          'There is a good chance.',
          'Quite likely.',
          'I think so.',
          'I hope not.',
          'I hope so.',
          'Never!',
          'Pfft.',
          'Sorry, bucko.',
          'Hell, yes.',
          'Hell to the no.',
          'The future is bleak.',
          'The future is uncertain.',
          'I would rather not say.',
          'Who cares?',
          'Possibly.',
          'Never, ever, ever.',
          'There is a small chance.',
          'Yes!',
          'lol no.',
          'There is a high probability.',
          'What difference does it makes?',
          'Not my problem.',
          'Ask someone else.',
        ]

        // New Embed
			const embed = new MessageEmbed()										
            .setTitle(message.translate(settings.Language, 'FUN/EIGHT_TITLE'))	// Title
            .setColor('RANDOM')													// Color
            .setDescription(responses[Math.floor(Math.random() * responses.length)]);									// Grab Chosen Fact
        
        // Send Message
        message.channel.send(embed);
    
	}
};
