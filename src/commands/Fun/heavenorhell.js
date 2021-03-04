const Discord = require("discord.js"),      // Discord API
    fs = require('fs'),								// NodeJS File System Heper
    fetch = require('node-fetch'),     // HTTP Fetcher
    Command = require('../../structures/Command.js');

module.exports = class Heavenorhell extends Command {
    // Command Constructor
    constructor(bot) {
        super(bot, {
            name: 'heavenorhell',
            dirname: __dirname,
            aliases: ['hh', '5050'],
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: 'Reddit 50/50. Don\'t take this command lightly!',
            usage: 'heavenorhell',
            cooldown: 1000,
        });
    }

    async run(bot, message, args, settings) {

        // Subreddits. Feel free to add or remove. Subreddit should be an imageboard subreddit. Some discussions work as well. WARNING: EXTREME DEGENERACY

        const subreddit = getSubreddit()
        // Grab Random Facts JSON
        console.log(getSubreddit())

        // Quirky responses to go with the choice. Feel free to add your own. Follow up with **/r${subreddit}**!
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
            `All dogs go to heaven, but not you! You’re going to **r/${subreddit}**!`
        ]

        // Choose random response
        var botResponse = responses[Math.floor(Math.random() * responses.length)];
        console.log(botResponse)

        try {
            // This PokeAPI JSON Holds Pokemon Information
            const body = await fetch(`https://www.reddit.com/r/${subreddit}.json?sort=top&t=week`).query({ limit: 800 })
                .then(res => res.json()
                    .catch((err) => {
                        if (message.deletable) message.delete();																// Delete User Message
                        bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);							// Log Error in console
                        return message.error(settings.Language, 'FUN/MISSING_POKEMON').then(m => m.delete({ timeout: 5000 }));	// Error Message
                    }));

            // NSFW Check
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => post.data.over_18 || !post.data.over_18);
            if (!allowed.length) return message.channel.send('No NSFW posts Detected!');

            // Choose Random Post
            const randomnumber = Math.floor(Math.random() * allowed.length)

            // Embed and send message
            const embed = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments + "\n**If no image loads, click the title to check the source. The image may be unsupported or non-existant with the original post**")
                .setFooter(`Memes and Images provided by r/${subreddit}`)
                .setURL(allowed[randomnumber].data.url)
            message.channel.send(`${botResponse}`)
            message.channel.send(embed)
            message.channel.send(`Direct Link Source:  ${allowed[randomnumber].data.url} `)

            // Error Catch
        } catch (err) {
            console.log(err)
            return message.channel.send("An Error Has Occured. Please check the Console Logs!")
        }






    }
}

function getSubreddit() {
    fs.readFile('../../assets/json/5050subreddit.json', (err, data) => {

        // Error Catcher
        if (err) {
            if (message.deletable) message.delete();
            bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
            return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
        }
        console.log(data)
        // Retrieve a random fact
        const Subreddits = JSON.parse(data);											// Separate JSON contents
        const num = (Math.floor((Math.random() * subreddits.subreddit.length) + 0));		// Get a random number (within JSON size)
        console.log(Subreddits.subreddit[num])
        
    })
}