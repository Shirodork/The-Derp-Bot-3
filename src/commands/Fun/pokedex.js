/**
 * Command: Pokedex
 * Summary: Search a pokemon with this command and recieve some basic information
 * Useage: [prefix] Pokedex <pokemon name or Number>
 */

// Dependencies
const { MessageEmbed } = require('discord.js'),
	fetch = require('node-fetch'),
	Command = require('../../structures/Command.js');

// Create Command Class
module.exports = class Pokedex extends Command {
	// Command Constructor
	constructor(bot) {
		super(bot, {
			name: 'pokedex',
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get information on a pokemon.',
			usage: 'pokedex <pokemon or pokemon number>',
			cooldown: 1000,
		});
	}

	// Command Function
	async run(bot, message, args, settings) {
		
		// Grab the pokemon arg
		const pokemon = args.join('-');
		
		// Pokedex Image
		var pokeDex = 'https://i.imgur.com/bG67Lcv.png'

		// Error catcher
		if (!pokemon) {
			if (message.deletable) message.delete();	// Delete Message
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
		}

		// Search for pokemon
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${args.join('-')}`)
			.then((info) => info.json())
			.catch((err) => {
				// No Pokemon/Error
				if (message.deletable) message.delete();															// Delete User Message
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);						// Log Error in console
				return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	// Error Message
			});

		// Search for Species Type
		const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${res.game_indices.id}`)
			.then((info) => info.json())
			.catch((err) => {
				// No Pokemon/Error
				if (message.deletable) message.delete();															// Delete User Message
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);						// Log Error in console
				return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	// Error Message
			});

		// Send response to channel
		const embed = new MessageEmbed()
			.setAuthor(`${res.species.name} #${res.game_indices.id}`, `${pokeDex}`)
			.setDescription(`**Type:** ${res.types.type.name} 
				\n**Egg Group:** ${res1.egg_groups.name}
				\n**Description:**: ${res1.flavor_text_entries.flavor_text}`)
			.setThumbnail(`${res.sprites.front_default}`)
			.setFooter(`First Appearance: ${res2.generation.name} | Generated With PokeAPI`, `https://pokeapi.co/`);
		message.channel.send(embed);
	}
};
