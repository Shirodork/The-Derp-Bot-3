// Dependencies
const fs = require('fs'),
    DiceRoller = require('rpg-dice-roller'),
    Command = require('../../structures/Command.js'),
    { MessageEmbed } = require('discord.js');


// Command Export
module.exports = class EightBall extends Command {
	constructor(bot) {
		super(bot, {
			name: 'roll',
			dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            aliases: ['dnd'],
			description: 'Roll the DnD Dice',
			usage: 'roll [#d#]',
			cooldown: 1000,
			examples: ['roll 1d12'],
		});
	}

	// Run command
	async run(bot, args, message, settings) {

		let dice = new DiceRoller.DiceRoller(); // create a new instance of the DiceRoller

		let input = args[0] ? args[0] : '1d6';
		
		dice.roll(input); // roll the dice

		let result = dice.log.shift(); // get the latest dice rolls from the log

		message.channel.send(`${message.author} rolled ${result.toString()}`);
	}
};
