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
			aliases: ['poke', 'dex'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get information on a pokemon.',
			usage: 'pokedex <pokemon or pokemon number>',
			cooldown: 1000,
		});
	}

	// Command Function
	async run(bot, message, args, settings) {
		
		// Handler: Modifies multi-worded names to conform to API Requirements
		var pokemon = args.join(' ').toLowerCase()
		pokemon = pokemon.replace(/[^A-Z0-9]+/ig, "-")
		pokemon = pokemon.replace(/\s/g, '');
		console.log(pokemon)


		// Pokedex Image
		var pokeDex = 'https://i.imgur.com/bG67Lcv.png'

		// Argument Check
		if (!pokemon) {
			if (message.deletable) message.delete();	// Delete Message
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
		}

		// This PokeAPI JSON Holds Pokemon Information
		const poke1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then(res => res.json()
		.catch((err) => {
			// No Pokemon/Error
			if (message.deletable) message.delete();																// Delete User Message
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
			return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
		}));
		
		// This PokeAPI JSON Holds Species Type Information
		const poke2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${poke1.id}`).then(res => res.json());


			if (!Object.keys(poke1).length || !Object.keys(poke2).length) {
				r.delete();
				message.error(settings.Language, 'SEARCHER/UNKNOWN_USER').then(m => m.delete({ timeout: 10000 }));
				return;
			}
		

		// Send response to channel
		const embed = new MessageEmbed()
			.setAuthor(`${poke1.species.name} #${poke1.id}`, `${pokeDex}`)
			.setDescription(`**Type:** ${poke1.types[0].type.name} 
				\n**Description:**: ${poke2.flavor_text_entries[poke2.flavor_text_entries.length-2].flavor_text}`)
			.setThumbnail(`${poke1.sprites.front_default}`)
			.setFooter(`First Appearance: ${poke2.generation.name} | Generated With PokeAPI`, `https://pokeapi.co/`, message.guild.iconURL);
		message.channel.send(embed);
		console.log(poke1)
	}
};
