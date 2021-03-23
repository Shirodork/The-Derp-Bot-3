// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class BassBoost extends Command {
	constructor(bot) {
		super(bot, {
			name: 'bassboost',
			dirname: __dirname,
			aliases: ['bb'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
			description: 'Sets the player\'s bass boost setting.',
			usage: 'bassbost',
			cooldown: 3000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {
		// Check that a song is being played
		const player = bot.manager.players.get(message.guild.id);
		if (!player) return message.error(settings.Language, 'MUSIC/NO_QUEUE').then(m => m.delete({ timeout: 5000 }));

		// Check that user is in the same voice channel
		if (message.member.voice.channel.id !== player.voiceChannel) return message.error(settings.Language, 'MUSIC/NOT_VOICE').then(m => m.delete({ timeout: 5000 }));

		if (player.bassboost === true) {
			// Change Bassboost value
			player.setBassboost(!player.bassboost)
			message.channel.send(`Bassboost Effect has been set to: ${player.bassboost}`);

		} else if (player.bassboost === false) {
			// Change Bassboost value
			player.setBassboost(!player.bassboost);
			player.bassboost = true		// TODO: Code does not auto-grab updated value. Need to grab updated value
			message.channel.send(`Bassboost Effect has been set to: ${player.bassboost}`);
		}
	};

};