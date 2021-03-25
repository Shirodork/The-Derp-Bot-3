# Command list
Please not the following syntax arguments:
><> represents a required argument || [] = optional arguments

>Default Prefix is '!'. Can be changed in Config. Be sure to update MongoDB 

## [Fun](https://github.com/Shirodork/The-Derp-Bot-3/blob/main/Documentation/FunCommandsFull.md)
| Command  | Description                                                | Proper Syntax                    |
|----------|------------------------------------------------------------|----------------------------------|
| Advice   | Displays a random piece of advice. (API Driven)            | !advice                          |
| Fact     | Supplies a random fact from a JSON repository              | !fact                            |
| Flip     | Flip a coin! Something rare might happen!                  | !flip                            |
| Meme     | Grabs a random meme (API Driven)                           | !meme                            |
| Person   | Generates a random person (API Driven)                     | !person                          |
| Ping     | Pong! Grabs local bot and discord API latency information  | !ping                            |
| Pokedex  | Provides detailed information on a requested pokemon       | !pokedex \<pokemon\>             |
| Random   | Random number generator. Input must be above zero!         | !random \<LowNum\> \<HighNum\>   |
| Reminder | Set a timed reminder. Bot will DM you when the timer is up | !reminder \<time\> \<info\>      |
| RPS      | Rock Paper Scissors!                                       | !rps \<option\>                  |
| Screenshot| Take a screenshop of a website. Must have Chrome installed| !screenshot \<website>           |
| Urban    | Look up the Urban Dictionary definition of a word          | e!urban \<phrase\>               |

## Guild
| Command     | Description                               | Proper Syntax                       |
|-------------|-------------------------------------------|-------------------------------------|
| Avatar      | Displays user's avatar.                   | !avatar \[user\]                     |
| Dashboard   | Sends a link to your Server\'s dashboard. | !dashboard                         |
| Giveaway    | Run a giveaway.                           | !giveaway \<time\> \<prize\> [channel] |
| Guildicon   | Get the server's icon.                    | !guildicon                         |
| Poll        | Create a poll for users to answer         | !poll \<question\>                 |
| Role info   | Get information on a role                 | !role-info \<role\>                |
| Server info | Get information on the server             | !server-info                       |
| User info   | Get information on a user                 | !user-info [user]                  |

## Host
| Command    | Description                                    | Proper Syntax             |
|------------|------------------------------------------------|---------------------------|
| Addban     | Add a ban to the global ban.                   | !addban \<user\> \<reason\>  |
| Eval       | Evaluates code.                                | !eval \<code\>           |
| Reload     | Reloads a command.                             | !reload <command>        |
| Shutdown   | Shutdowns the bot                              | !shutdown                |

## Image
| Command      | Description                        | Proper Syntax                   |
|--------------|------------------------------------|---------------------------------|
| Blurpify     | Blurpify an image.                 | !blurpify [image]              |
| Captcha      | Create a captcha image.            | !captcha                       |
| Cat          | Have a nice picture of a cat.      | !cat                           |
| Changemymind | Create a change my mind image.     | !changemymind \<text\>         |
| Clyde        | Create a fake Clyde message.       | !clyde \<text\>                |
| Deepfry      | Deepfry an image                   | !deepfry [image]               |
| Dog          | Have a nice picture of a dog.      | !dog                           |
| Generate     | Generate a custom image.           | !generate \<option\> [image]   |
| Image        | Finds an image based on the topic. | !image \<topic\>               |
| Phcomment    | Create a fake Pornhub comment.     | !phcomment [user] \<text\>     |
| QR code      | Create a QR code.                  | !qrcode \<text\>               |
| Ship         | Create a ship image.               | !ship \<user1\> [user2]        |
| Stick bug    | Create a stickbug meme.            | !stickbug [image]              |
| Threats      | Creates a threat meme.             | !threats [image]               |
| Twitter      | Create a fake Twitter tweet.       | !twitter \<user\> \<text\>     |
| Whowouldwin  | Create a whowouldwin image.        | !whowouldwin \<user1\> [user2] |

| Command     | Description                               | Proper Syntax |
|-------------|-------------------------------------------|---------------|
| Leaderboard | Displays the Servers's level leaderboard. | !leaderboard |
| Rank        | Shows your rank/Level.                    | !rank [user] |

## Misc
| Command  | Description                                               | Proper Syntax    |
|----------|-----------------------------------------------------------|------------------|
| About    | Information about me.                                     | !about          |
| Help     | Sends information about all the commands that I can do.   | !help           |
| Invite   | Send an invite link so people can add me to their server. | !invite         |
| Shorturl | Creates a shorturl on the URl you sent.                   | !shorturl \<url\> |
| Status   | Gets the status of the bot.                               | !status         |
| Support  | Get support on the bot.                                   | !support        |

## Moderation
| Command       | Description                            | Proper Syntax                   |
|---------------|----------------------------------------|---------------------------------|
| Ban           | Ban a user.                            | !ban \<user\>                  |
| Clear-warning | Remove warnings from a user.           | !clear-warnings \<user\>       |
| Clear         | Clear a certain amount of messages.    | !clear \<number\>              |
| Deafen        | Deafen a user.                         | !deafen \<user\> [time]        |
| Kick          | Kick a user.                           | !kick \<user\>                 |
| Language      | Changes the language of the bot.       | !language \<language\>         |
| Mute          | Mute a user.                           | !mute \<user\> [time]          |
| Nick          | Change the nickname of a user.         | !nick \<user\> <Nickname>      |
| Report        | Report a user.                         | !report \<user\> <reason>      |
| Slowmode      | Activate slowmode on a channel.        | !slowmode \<time\>             |
| Ticket        | Open a support ticket.                 | !ticket \<reason\>             |
| Unban         | Unban a user.                          | !unban \<user\> [reason]       |
| Undeafen      | Undeafen a user.                       | !undeafen \<user\>             |
| Unmute        | Unmute a user.                         | !unmute \<user\>               |
| Warn          | Warn a user.                           | !warn \<user\> [time] [reason] |
| Warnings      | Display number of warnings a user has. | !warnings \<user\>             |

## Music
| Command   | Description                                | Proper Syntax          |
|-----------|--------------------------------------------|------------------------|
| Bassboost | Bassboost a song.                          | !bassboost \<Number\>   |
| Forceskip | Force skip a song.                         | !forceskip \<position\> |
| Leave     | Leave the channel.                         | !leave                |
| Loop      | (un)Loop the queue.                        | !loop \<song \| queue\> |
| Lyrics    | Get lyrics on a song.                      | !lyrics [lyrics]      |
| Move here | Move the bot to a different voice channel. | !movehere             |
| Pause     | Pause the music.                           | !pause                |
| Play-file | Play a file.                               | !play-file \<file\>     |
| Play      | Play a song.                               | !play \<Song\>          |
| Queue     | Displays the music queue.                  | !queue                |
| Radio     | Play the radio.                            | !radio \<Radio\>        |
| Remove    | Remove song(s) from the queue.             | !emove \<position\>     |
| Resume    | Resume the music                           | !resume               |
| Search    | Searches for a song.                       | !search \<Song\>        |
| Seek      | Goes to a particular time.                 | !seek \<Time\>          |
| Shuffle   | Shuffles up the queue.                     | !shuffle              |
| Skip      | Skip the current song.                     | !skip                 |
| Skipto    | Skip to a song in the queue.               | !skipto \<position\>    |
| Song      | Displays the current song playing.         | !song                 |
| Volume    | Change the volume of the song.             | !volume \<Number\>      |

## Searcher
| Command   | Description                                  | Proper Syntax                                      |
|-----------|----------------------------------------------|----------------------------------------------------|
| Instagram | Get information on an Instagram account.     | !instagram \<user\>                               |
| Reddit    | Send a random image from a chosen subreddit. | !reddit \<subreddit\>                             |
| Steam     | Get information on a Steam account.          | !steam \<user\>                                   |
| Twitch    | Get information on a twitch account.         | !twitch \<user\>                                  |
| Weather   | Look up the weather in a certain area.       | !weather \<location\>                             |
