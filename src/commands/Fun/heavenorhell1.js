/**
 * Command: Fact
 * Summary: Requests a single fact from a pre-created JSON (Over 1000 facts)
 * Useage: [prefix] fact
 */

// Constant Dependencies
const fs = require('fs'),								// NodeJS File System Heper
 { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),	// Command Handler
	fetch = require('node-fetch')								// HTTP Request


// Command Class Createion
module.exports = class heavenorhell1 extends Command {

	// Command Construct
	constructor(bot) {
		super(bot, {
			name: 'heavenorhell1',
			dirname: __dirname,
			aliases: ['hh1'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Receive a random fact.',
			usage: 'fact',
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, args, settings) {

		var randomReddit = [
			'furry',
			'mildlyinfuriating',
			'furry_irl',
			'aww',
			'yiff',
			'pokemon',
			'yiffgif',
			'reverseanimalrescue',
			'smashbros34',
			'funny',
			'gfur',
			'dataisbeautiful',
			'UrethraPorn',
			'holdmyredbull',
			'WTF_Wallpapers',
			'MedicalGore',
			'EarthPorn',
			'SpidersGoneWild',
			'foodporn',
			'SnotPorn',
			'carporn',
			'pcmasterrace',
			'dbdgonewild',
			'Art',
			'Fire_Emblem_R34',
			'Design',
			'mariorule34',
			'InternetIsBeautiful',
			'WhyWouldYouFuckThat',
			'Coffee',
			'HotDogPorn',
			'facepalm',
			'burningporn',
			'facepalm',
			'ImGoingToHellForThis',
			'photography',
			'ectalProlapse',
			'HistoryPorn',
			'squidsgonewild',
			'dankmemes',
			'DinoBalls',
			'me_irl',
			'popping',
			'awwnime',
			'Metroid34',
			'puppies',
			'proteinmodels',
			'minimalism',
			'food',
			'rule34',
			'lifehacks',
			'PokePorn',
			'travel',
			'mantits',
			'wholesomememes',
			'Penispaint',
			'CityPorn',
			'AnimalsBeingBros',
			'NKGW',
			'creepy',
			'ClopClop',
			'OldSchoolCool',
			'trypophobia',
			'MechanicalKeyboards',
			'Slutoon',
			'teenagers',
			'GayPokePorn',
			'MapPorn',
			'animalcrossingr34',
			'AnimalsBeingJerks',
			'tinydick',
			'Whatcouldgowrong',
			'trypophobia',
			'insanepeoplefacebook',
			'vomit',
			'woahdude',
			'NSFW_GIF',
			'reactiongifs',
			'NSFW_Korea',
			'PewdiepieSubmissions',
			'NSFW_Japan',
			'Unexpected',
			'creampies',
			'gardening',
			'boobies',
			'instant_regret',
			'ass',
			'drawing',
			'hentai_gif',
			'rarepuppers',
			'Rule34LoL',
			'itookapicture',
			'MechanicalSluts',
			'europe',
			'MonsterGirl',
			'Damnthatsinteresting',
			'ArousingAvians',
			'ContagiousLaughter',
			'WholesomeYiff',
			'BetterEveryLoop',
			'femyiff',
			'GifRecipes',
			'gwpublic',
			'CrappyDesign',
			'Breeding',
			'slowcooking',
			'Puke',
			'oddlysatisfying',
			'diapersgonewild',
			'iamverybadass',
			'FearMe',
			'NatureIsFuckingLit',
			'robotporn',
			'comics',
			'cummingonfigurines',
			'Tinder',
			'PornhubComments',
			'futanari',
			'trippinthroughtime',
			'DragonPenis',
			'BikiniBottomTwitter',
			'lesbians',
			'tattoos',
			'fillyfiddlers',
			'WinStupidPrizes',
			'GoneWild',
			'Wellthatsucks',
			'UnderTail',
			'cringepics',
			'Pee',
			'WatchPeopleDieInside',
			'horsemaskgw',
			'FoodPorn',
			'peegonewild',
			'interestingasfuck',
			'nsfl',
			'funny',
			'legoporn',
			'pics',
			'FeralPokePorn',
			'nextfuckinglevel',
			'PokePorn',
			'blessedimages',
			'clownbutter',
			'Awwducational',
			'hentai',
			'Gifs',
			'BaguettesInButts',
			'Minecraft',
			'Shemales',
			'HorseMask',
			'AnimalsWithoutNecks',
			'TIHI',
			'Nonononoyes',
			'furryporn',
			'birdswitharms',
			'dragonsfuckingcars',
			'FuckYouImAShark',
			'NSFW_GIF',
			'AnimalsBeingDerps',
			'cumsluts'
		]

		// Choose random subreddit
		var subreddit = randomReddit[Math.floor(Math.random() * randomReddit.length)];
		console.log(subreddit)
		var responses = [
			`You see a portal. You decide to hop in. On the other side, you find yourself in **r/${subreddit}**`,
			`You have rolled the dice! Your fate has been sealed. The subreddit given to you by destiny is: **r/${subreddit}**`,
			`You’re on the run from space pirates! As a last resort, you enter a dimensional wormhole. Alas, you find yourself in **r/${subreddit}**`,
			`You’re enjoying an icecream when all of a sudden a canvas bag is put over you. You’ve been kidnapped! Hours later you are dumped in **r/${subreddit}**`,
			`You’re enjoying your day when Thanos appears beside you. He picks you up and **YEETS** you into **r/${subreddit}**`,
			`You’re at a party. You take a huge hit from the public bong. You start tripping out in **r/${subreddit}**`,
			`You’re standing beside a phonebooth when the phone suddenly rings. You answer the phone and suddenly you awaken, realizing you were stuck in the matrix. The real world is actually **r/${subreddit}**`,
			`You’re walking down the stairs when suddenly you trip and die. Your afterlife is constant exposure to **r/${subreddit}**`,
			`You decide that life isn’t worth living anymore. You off yourself. You now spend eternity in **r/${subreddit}**. Was it worth it?`,
			`You’re fighting along side Wraith. She sets up a portal. You enter, but **Oh No!**, its malfunctioned. You find yourself stuck in **r/${subreddit}**`,
			`All dogs go to heaven, but not you! You’re going to **r/${subreddit}**!`,
		]

		// Choose random response
		var botResponse = responses[Math.floor(Math.random() * responses.length)];


		const eww = await fetch(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`)
			.then(res => res.json()
				.catch((err) => {
					// No Pokemon/Error
					if (message.deletable) message.delete();																// Delete User Message
					bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
					return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
				}));

		console.log(eww)
		console.log(eww.data.num_comments)
		// New Embed
		const embed = new MessageEmbed()
			.setTitle(botResponse)
			.setDescription("Posted by: " + body.data.author)
			.setColor(0x00A2E8)
			.setFooter(`Memes and Images provided by r/${subreddit}`)
			.setURL(body.data.url)
			.setImage(body.data.url)
			.addField("Other info:", "Up votes: " + body.data.ups + " / Comments: " + body.data.num_comments + "\n**If no image loads, click the title to check the source. The image may be unsupported or non-existant with the original post**")



		// Send Message
		message.channel.send(embed);
	}


}

