// Dependencies
const fetch = require('node-fetch'),
	Command = require('../../structures/Command.js'),
    { MessageEmbed } = require('discord.js');

module.exports = class RedditNSFW extends Command {
	constructor(bot) {
		super(bot, {
			name: 'redditnsfw',
            nsfw: true,
			dirname: __dirname,
            aliases: ['rnsfw', 'rednsfw'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Grab a post from an NSFW subreddit',
			usage: 'redditnsfw <subreddit>',
            examples: ['rnsfw porn'],
			cooldown: 1000,
		});
	}

	// Run command
	async run(bot, message, settings) {
        
        var sreddit = message.args.join(' ').toLowerCase()
        console.log(sreddit)
        if (!sreddit) return message.channel.error(settings.Language, 'INCORRECT_FORMAT');
		try {
			const {data} = await fetch(`https://www.reddit.com/r/${sreddit}.json?sort=top&t=week`).then(res => res.json());
			const allowed = data.data.children.filter(post => post.data.over_18 == "true")
            console.log(allowed[0].data.over_18)
            if (!allowed.length) return message.channel.send('No NSFW posts Detected!');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new MessageEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter(`Memes and Images provided by r/${sreddit}`)
        .setURL(allowed[randomnumber].data.url)
        
        // Send Message
        message.channel.send(embed);
		} catch (err) {
			if (message.deletable) message.delete();
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			message.channel.error(settings.Language, 'ERROR_MESSAGE', err.message).then(m => m.delete({ timeout: 5000 }));
		}
	}
};
