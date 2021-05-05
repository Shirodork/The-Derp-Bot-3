/**
 * Command: Pokedex
 * Summary: Search a pokemon with this command and recieve some basic information
 * Useage: [prefix] Pokedex <pokemon name or Number>
 */

// Dependencies and Vars
const { MessageEmbed } = require('discord.js'),					// Grab Message Embed from DiscordJS
	fetch = require('node-fetch'),								// HTTP Request
	Command = require('../../structures/Command.js'),			// Command Handler
	cheerio = require('cheerio'),								// HTTP Content Grabber
	api = {														// Holds Hold Required Websites and API URLs
		bulba: 'https://bulbapedia.bulbagarden.net/wiki/',
		pokemon: 'https://pokeapi.co/api/v2/pokemon/',
		species: 'https://pokeapi.co/api/v2/pokemon-species/'
	};


// Pokedex Image
var pokeDex = 'https://i.imgur.com/bG67Lcv.png'

// Special map for handling BulbaPedia-specific Pokemon Syntaxes
const bulbaMap = {
	'nidoran-f': 'Nidoran%E2%99%80_(Pok%C3%A9mon)',
	'nidoran-m': 'Nidoran%E2%99%82_(Pok%C3%A9mon)',
	'mr-mime': 'Mr._Mime',
	'mime-jr': 'Mime_jr.',
	'type-null': 'Type:_Null',
	'jangmo-o': 'jangmo-o',
	'hakamo-o': 'hakamo-o',
	'kommo-o': 'kommo-o',

	'tapu-koko': 'tapu_Koko',
	'tapu-lele': 'tapu_Lele',
	'tapu-bulu': 'tapu_Bulu',
	'tapu-fini': 'tapu_Fini',
	'492' : 'shaymin',
	'487' : 'giratina',
}

const pokeMap = {
	'giratina' : 'giratina-origin',
	'shaymin' : 'shaymin-land',
}

const poke2Map = {
	'giratina-origin' : '487',
	'giratina-altered' : '487',
	'shaymin-land' : '492',
	'shaymin-sky' : '492',
}
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

		// Handler: Modifies multi-worded names to conform to API Requirements
		var pokemon = message.args.join(' ').toLowerCase()
		pokemon = pokemon.replace(/[^A-Z0-9]+/ig, "-")
		pokemon = pokemon.replace(/\s/g, '');

		//console.log(pokemon)

		// Argument Check
		if (!pokemon) {
			if (message.deletable) message.delete();	// Delete Message
			return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
		}
		
		pokemon = pokeMap[pokemon] || pokemon

		// This PokeAPI JSON Holds Pokemon Information
		const poke1 = await fetch(api.pokemon + pokemon)
			.then(res => res.json()
				.catch((err) => {
					// No Pokemon/Error
					if (message.deletable) message.delete();																// Delete User Message
					bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
					return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
				}));
				console.log(poke1)
		
				pokemon = poke2Map[pokemon] || pokemon

				// This PokeAPI JSON Holds Species Type Information
		const poke2 = await fetch(api.species + pokemon).then(res => res.json());

		// Grab Bulbapedia Info Page
		pokemon = bulbaMap[pokemon] || pokemon
		const bulb = await fetch(api.bulba + pokemon).then(r => r.text())

		// Grab Bio of pokemon from the info page
		const bio = cheerio.load(bulb)('#Biology').parent().nextUntil('h2').not('.thumb').text().trim().replace(/\n/g, '\n\n')

		// Get Type
		/*
		const getType = (types, i) => types.find(e => e.slot === i) || { type: { name: (i === 1 ? '???' : null) } }
		const type = getType(poke1.types, 1).type.name
		const type_alt = getType(poke1.types, 2).type.name
		*/
		const types = {}
		poke1.types
			.forEach(e => types[e.slot] = e.type.name)
		const type1 = types[1]
		const type2 = types[2]

		// Get Stats
		const stats = {}
		poke1.stats.forEach(e => stats[e.stat.name] = e.base_stat)	// Grabs Stat name and Stat Value for each stat

		// Get Abilities
		const abilities = {}
		poke1.abilities
			.forEach(e => abilities[e.slot] = e.ability.name)

		console.log(abilities)

		// Get PokeDex Description - English
		const dex = []

		poke2.flavor_text_entries
			.filter(e => e.language.name === 'en')	// Filter for English Entries
			.forEach(e => dex.push({ version: e.version.name, text: e.flavor_text }))	// For every entry, push Version and associated text to Dex array

		const embed = new MessageEmbed()
			.setTitle(capitalize(poke1.name) + ' #' + poke1.id + ' - ' + Type(bot, types[1]) + Type(bot, types[2]))
			.setDescription(bio.split('\n\n')[0].trim() + `\n[Read More](${api.bulba}${poke1.name})`)
			.setColor(color(colors))
			.setThumbnail(poke1.sprites.front_default)
			.setAuthor('The ' + poke2.genera.find(e => e.language.name === 'en').genus, pokeDex)
			.setFooter('Information Gathered from PokeAPI and Bulbapedia')
			.addField('Info', '**Capture Rate:**' + poke2.capture_rate + evolvesFrom(poke2.evolves_from_species ? poke2.evolves_from_species.name : null), true)
			.addField('\u200b', gender(poke2.gender_rate) + '\n:straight_ruler: ' + (poke1.height / 10) + 'm - :scales: ' + (poke1.weight / 10) + 'kg', true)
			.addField('Abilities', printAbilities(abilities))
			.addField(`Dex (${capitalize(dex[0].version)})`, dex[0].text.replace(/\n/g, ' '))
			.addField('Stats', '```asciidoc\nHP  :: ' + stats.hp + '\nAtk :: ' + stats.attack + '\nDef :: ' + stats.defense + '\n```', true)
			.addField('\u200b', '```asciidoc\nSpeed  :: ' + stats.speed + '\nSp.Atk :: ' + stats['special-attack'] + '\nSp.Def :: ' + stats['special-defense'] + '\n```', true)

		message.channel.send({ embed })
			//.then(m => poke1.id === 149 ? m.react('\u{1f499}') : '')
	}
};

// Capitalization Function
function capitalize(str) {
	if (!str) return ''
	return str[0].toUpperCase() + str.substring(1).toLowerCase()
}

// Pokem Type Formatting
function Type(bot, type) {
	if (type === null || type === undefined || typeof type !== 'string') return ''
	if (type === '???') type = 'unknown'

	type = type.toLowerCase().replace('-', '')

	return ' ' + `${(bot.emojis.cache.find(e => e.name === `type_${type}`) || `[${capitalize(type)}]`)}`
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

function printAbilities(ability) {
	var abilities = '';
	for (var e in ability) {
		abilities += e + ': ' + ability[e] + '\n';
	}
	return (abilities)
}

// Evolution Formatter
function evolvesFrom(ev) {
	return ev ? `\n**Evolves from:** [${capitalize(ev)}](${api.bulba}${ev})` : ''
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
