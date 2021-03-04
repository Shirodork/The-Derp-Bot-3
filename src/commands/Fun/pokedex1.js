/**
 * Command: Pokedex1
 * Summary: Search a pokemon with this command and recieve some basic information
 * Useage: [prefix] Pokedex <pokemon name or Number>
 */

// Dependencies and Vars
const { MessageEmbed } = require('discord.js'),
	fetch = require('node-fetch'),
	Command = require('../../structures/Command.js')
fetchPokemon = require('../../helpers/fetchpokemon.js')


// Pokedex Image
var pokeDex = 'https://i.imgur.com/bG67Lcv.png'

// Create Command Class
module.exports = class Pokedex extends Command {
	// Command Constructor
	constructor(bot) {
		super(bot, {
			name: 'pokedex1',
			dirname: __dirname,
			aliases: ['poke1'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Testing Command',
			usage: 'pokedex1 <pokemon or pokemon number>',
			cooldown: 1000,
		});
	}



	// Command Function
	async run(bot, message, args, settings) {

		// Handler: Modifies multi-worded names to conform to API Requirements
		var pokemon = args.join(' ').toLowerCase()
		pokemon = pokemon.replace(/[^A-Z0-9]+/ig, "-")
		pokemon = pokemon.replace(/\s/g, '');

		// Argument Check
		if (!pokemon) {
			if (message.deletable) message.delete();	// Delete Message
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
		}

		let data

		try {
			data = await fetchPokemon(pokemon)
		} catch (err) {
			if (message.deletable) message.delete();														    // Delete User Message
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);						// Log Error in console
			return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	// Error Message
		}

		const embed = new Discord.RichEmbed()

		embed.setTitle(capitalize(data.name) + ' #' + data.id + ' -' + type(bot, data.type) + type(bot, data.type_alt))
			.setDescription(data.description.split('\n\n')[0].trim() + `\n[Read More](${fetchPokemon.api.bulba}${data.name})`)
			.setColor(color(data.color))
			.setThumbnail(data.sprite_front)
			.setAuthor(data.genus)
			.setFooter('Information Gathered from PokeAPI and Bulbapedia')
			.addField('Info', '**Capture Rate:**' + data.capture_rate + evolvesFrom(data.evolvesFrom), true)
			.addField('\u200b', gender(data.gender_rate) + '\n:straight_ruler: ' + (data.height / 10) + 'm - :scales: ' + (data.weight / 10) + 'kg', true)
			.addField('Abilities', getAbilities(data.abilities), true)
			.addField(`Dex (${capitalize(data.dex[0].version)})`, data.dex[0].text.replace(/\n/g, ' '))
			.addField('Stats', '```asciidoc\nHP  :: ' + data.stats.hp + '\nAtk :: ' + data.stats.attack + '\nDef :: ' + data.stats.defense + '\n```', true)
    		.addField('\u200b', '```asciidoc\nSpeed  :: ' + data.stats.speed + '\nSp.Atk :: ' + data.stats['special-attack'] + '\nSp.Def :: ' + data.stats['special-defense'] + '\n```', true)


		/*
		// Send response to channel
		const embed = new MessageEmbed()
			.setAuthor(`${poke1.species.name} #${poke1.id}`, `${pokeDex}`)
			.setDescription(`**Type:** ${poke1.types[0].type.name} 
				\n**Description:**: ${poke2.flavor_text_entries[poke2.flavor_text_entries.length - 2].flavor_text}`)
			.setThumbnail(`${poke1.sprites.front_default}`)
			.setFooter(`First Appearance: ${poke2.generation.name} | Generated With PokeAPI`, `https://pokeapi.co/`, message.guild.iconURL);
		message.channel.send(embed);
		console.log(poke1)
	*/
	}
};

// Capitalization Function
function capitalize(str) {
	if (!str) return ''
	return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

// Pokem Type Formatting
function type(bot, type) {
	if (type === null || type === undefined || typeof type !== 'string') return ''
	if (type === '???') type = 'unknown'

	type = type.toLowerCase().replace('-', '')

	return ' ' + (bot.emojis.find(e => e.name === `type_${type}`) || `[${capitalize(type)}]`)
}

// color Holder
const colors = {
	red: '#ec8484',
	blue: '#94dbee',
	yellow: '#ffff99',
	green: '#64d364',
	black: '#bbbbbb',
	brown: '#cc9966',
	purple: '#c183c1',
	gray: '#d1d1e0',
	grey: '#d1d1e0',
	white: '#ffffff',
	pink: '#f4bdc9'
}

// Color Picker
function color(color) {
	return colors[color] || '#000000'
}


// Evolution Formatter
function evolvesFrom(ev) {
	return ev ? `\n**Evolves from:** [${capitalize(ev)}](${fetchPokemon.api.bulba}${ev})` : ''
}

function getAbilities(abilities) {
	const list = ''
	abilities.forEach(e => {
		list = list + `${abilities[e]}\n`
	});

	return list
}
const femaleSign = `\u{2640}`
const maleSign = `\u{2642}`

// Gender Ratio
function gender(rate) {
	if (rate === -1) {
		return 'Genderless'
	}

	const female = rate / 8 * 100
	const male = 100 - female
	const str = `${maleSign} ${male}% - ${femaleSign} ${female}%`
	const ratio = Math.floor(str.length * (male / 100))

	if (rate === 8) {
		return `${femaleSign} Female only`
	} else if (rate === 0) {
		return '${maleSign} Male only'
	}

	return '__' + str.substring(0, ratio) + '__' + str.substring(ratio)
}
