const fetch = require('node-fetch'),
    cheerio = require('cheerio')
api = {
    bulba: 'https://bulbapedia.bulbagarden.net/wiki/',
    pokemon: 'https://pokeapi.co/api/v2/pokemon/',
    species: 'https://pokeapi.co/api/v2/pokemon-species/'
};

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
  }

async function getPokeInfo(pokemon) {
    try {
        // This PokeAPI JSON Holds Pokemon Information
        const poke1 = await fetch(api.pokemon + pokemon)
            .then(res => res.json()
                .catch((err) => {
                    // No Pokemon/Error
                    if (message.deletable) message.delete();																// Delete User Message
                    bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
                    return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
                }));

        // This PokeAPI JSON Holds Species Type Information
        const poke2 = await fetch(api.species + poke1.id).then(res => res.json());

        // Grab Bulbapedia Info Page
        bulbaPoke = bulbaMap[pokemon]
        const bulb = await fetch(api.bulba + bulbaPoke).then(r => r.text())
        // Grab Bio of pokemon from the info page
        const bio = cheerio.load(bulb)('#Biology').parent().nextUntil('h2').not('.thumb').text().trim().replace(/\n/g, '\n\n')

        // Get Type
        const getType = (types, i) => types.find(e => e.slot === i) || { type: { name: (i === 1 ? '???' : null) } }

        // Get Stats
        const stats = {}
        poke1.stats.forEach(e => stats[e.stat.name] = e.base_stat)	// Grabs Stat name and Stat Value for each stat

        // Get Abilities
        const abilities = {}
        poke1.abilities
                .forEach(e => abilities[e.slot] = e.ability.name)

        // Get PokeDex Description - English
        const dex = []

        poke2.flavor_text_entries
            .filter(e => e.language.name === 'en')	// Filter for English Entries
            .forEach(e => dex.push({ version: e.version.name, text: e.flavor_text }))	// For every entry, push Version and associated text to Dex array

        return {
            id: poke1.id,
            name: poke1.name,
            type: getType(poke1.types, 1).type.name,
            type_alt: getType(info.types, 2).type.name,
            shape: poke2.shape.name,
            color: poke2.color.name,
            gender_rate: poke2.gender_rate,
            capture_rate: poke2.capture_rate,
            genus: poke2.genera.find(e => e.language.name === 'en').genus,
            evolves_from: poke2.evolves_from_species ? species.evolves_from_species.name : null,
            stats: stats,
            height: poke1.height,
            weight: poke1.weight,
            sprite_front: poke1.sprites.front_default,
            description: bio,
            dex: dex,
            abilities: abilities
        }
    } catch (err) {
        if (message.deletable) message.delete();														    // Delete User Message
        bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);						// Log Error in console
        return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));	// Error Message
    }
}