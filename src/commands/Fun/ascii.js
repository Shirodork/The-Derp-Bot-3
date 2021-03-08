// Dependencies
const Command = require('../../structures/Command.js');
// Ascii-Art Package
const ascii = require('ascii-art');

module.exports = class Ascii extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ascii',
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES'],
            description: 'Convert text to Ascii!',
            usage: 'ascii <statement>',
            cooldown: 1000,
        });
    }

    // Run command
    async run(bot, message, args, settings) {

        if (!args[0]) {
            if (message.deletable) message.delete();	// Delete Message
            return message.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));	// Return Error
        }


        // Font Generation
        ascii.font(args.join(' '), 'Doom', function (rendered) {

            // Remove white spaces to the right of the string
            rendered = rendered.trimEnd();

            // Checks if string is above a certain limit
            if (rendered.length > 2000) return message.channel.send('Error: Message too long!');

            // If no returns, send the message in a markup box
            message.channel.send(rendered, {
                code: 'md'
            });
        })
    }
}
