// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class VaporWave extends Command {
	constructor(bot) {
		super(bot, {
			name: 'vaporwave',
			dirname: __dirname,
			aliases: ['vwave'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
			description: 'Toggles Vaporwave audio affect.',
			usage: 'vaporwave',
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

		if (player.vaporwave === true) {
			// Change Nightcore value
			player.setVaporwave(!player.vaporwave)
			message.channel.send(`Vaporwave Effect has been set to: ${player.vaporwave}`);

		} else if (player.vaporwave === false) {
			// Change Nightcore value
			player.setVaporwave(!player.vaporwave);
			player.vaporwave = true		// TODO: Code does not auto-grab updated value. Need to grab updated value
			message.channel.send(`Vaporwave Effect has been set to: ${player.vaporwave}`);
		}
	};

};