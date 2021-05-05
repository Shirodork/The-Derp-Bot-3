// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class NightCore extends Command {
	constructor(bot) {
		super(bot, {
			name: 'nightcore',
			dirname: __dirname,
			aliases: ['ncore'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
			description: 'Toggles Nightcore audio affect.',
			usage: 'nightcore',
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

		if (player.nightcore === true) {
			console.log('should be false')
			// Change Nightcore value
			player.setNightcore(!player.nightcore)
			message.channel.send(`Nightcore Effect has been set to: ${player.nightcore}`);

		} else if (player.nightcore === false) {
			// Change Nightcore value
			player.setNightcore(!player.nightcore);
			player.nightcore = true		// TODO: Code does not auto-grab updated value. Need to grab updated value
			message.channel.send(`Nightcore Effect has been set to: ${player.nightcore}`);
		}
	}

};