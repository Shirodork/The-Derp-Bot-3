# Detailed Command Information [FUN]

The following section explain the commands in detail and provides example and syntax information. Note that example outputs may have been simplified.

# Fun Commands

### **Advice**
---
> ##### Summary <p>
> This command utilizes node-fetch to obtain a peice of advice from an [AdviceAPI](api.adviceslip.com). API returns a JSON and the command creates an embed with the provided information. 
##### Example
| Input       | Output |
|-------------|--------|
| !advice     | Dont put all your eggs in one basket! |

### **Fact**
---
> ##### Summary <p>
> This command prints a random fact. The random fact is generated from the random-facts.json file located in assets/jason directory. Utilizes Math.random to choose a fact. Output is an discord Embed. 
##### Aliases
This command can also be activated with the following aliases:
+ facts
##### Example
| Input       | Output                                |
|-------------|---------------------------------------|
| !fact       | Oak trees can live 200 or more years. |

### **Flip**
---
> ##### Summary <p>
> This command utilizes a small array and a Math.Random command to choose between heads, tails, or a rare special option! 
##### Example
| Input       | Output |
|-------------|--------|
| !flip       | Heads! |

### **Meme**
---
> ##### Summary <p>
> This command the [KsoftAPI](https://api.ksoft.si/) to randomly request a meme image URL. Memes are pulled from a reddit subreddit. 
##### Example
| Input       | Output                  |
|-------------|-------------------------|
| !meme       | [Embeded image of meme] |
 
### **Person**
---
> ##### Summary <p>
> This Command Utilizes a [Person-Generator API](https://person-generator.com) to generate a random person with extra details such as:
> + Name
> + Gender
> + Date of Birth
> + Height
> + Job
> + Company
> Please note that the person generated is FAKE. Great for quick on the go character creation!
##### Example
| Input       | Output |
|-------------|--------|
| !person     | I found a Person whose name is Stan Harvey <p>Name: Stan Harvey <p>Gender: Male <p>[...] |
 
### **Pokedex \<pokemon>**
---
> ##### Summary <p>
> This command utilizes the [PokeAPI] and [Bulbapedia] to look up and provide information on a given pokemon. The command utilizes node-fetch and cheerio NPM packages to obtain information. Information provided includes:
> + Name & Number
> + Bulbapedia Bio
> + PokeAPI Pokedex Entry
> + Info and Stats

##### Aliases
This command can also be activated with the following aliases:
+ poke
+ dex
+ pokemon
##### Example
| Input          | Output |
|----------------|--------|
| !pokemon Eevee | [Detailed Embed of information regarding pokemon] |

| Syntax     | Explaination                                                                                                                                                | Example(s)           |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| \<Pokemon> | Name of Pokemon. Does not have to be in any particular format. Code will automatically handle spaces and special characters to conform to API requirements. | Mr. Mime             |

### **Random \<Low Number> \<High Number>**
---
> ##### Summary <p>
> This command utilizes a basic math random function to return a random number within a given range. 
 <p> The command checks for the following:
   
- Makes sure all required arguments are accounted for
- Makes sure all required arguments are numbers
- Makes sure they follow the correct syntax ( \<Low Number> is lower than \<high number> and is above zero )
  
##### Example
  
| Input       | Output |
|-------------|--------|
| !random 1 5 | 4      |

| Syntax        | Explaination                                                                             | Example |
|---------------|------------------------------------------------------------------------------------------|---------|
| \<Low Number>  | The lower boundary of the random number range to generate. Must be above Zero!           |  1      |
| \<High Number> | The upper boundary of the random number range to generate. Must be above the Low Number! | 5       |

### **Reminder \<time> \<reason>**
---
> ##### Summary <p>
> This command utilizes an async function to allow the user to set a reminder or timer. Utilizes NPM package "ms" to convert time inputted into milliseconds. Reminders are DM'ed directly to the user, reducing server spam. Command also utilizes images and the time-converter helper found in the SRC directory to aid in calculations and looks.

##### Aliases
This command can also be activated with the following aliases:
+ remindme
+ remind
+ timer
##### Example
| Input                                        | Output                           |
|----------------------------------------------|----------------------------------|
| !reminder 45m Take the cake out of the oven! | [Embeded DM to user of reminder] |
 
| Syntax    | Explaination                                                                                                                            | Example(s)                                                  |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| \<Time>   | Time for the reminder. Must be used with one of the following modifiers: <p> - Day (d) <p> - Hour (h) <p> - Minute (m) <p> - Second <h> | 1d = 1 day 12h = 12 hours 30m = 30 minutes 60s = 60 seconds |
| \<reason> | The reason for setting the timer.                                                                                                       | Bring out Oven Cake!     

### **RPS \<Option>**
---
> ##### Summary <p>
> Play Rock-Paper-Scissors with the bot! Utilizes a choice array, Math.Random, and simple AND/OR logic to play a game of Rock Paper Scissors. 
##### Example
| Input       | Output                                 |
|-------------|----------------------------------------|
| !rps rock   | [Embed of Bot's choice and the winner] |

| Syntax    | Explaination                                                                           | Example(s)           |
|-----------|----------------------------------------------------------------------------------------|----------------------|
| \<option> | User's choice of what hand they want to play. Can be either rock, paper, or scissors.  | rock                 |

### **Screenshot \<Full Website URL>**
---
> ##### Summary <p>
>  This command utilizes the NPM package "puppeteer" to open a chrome instance and take a screenshot of the inputted website. 
##### Example
| Input                               | Output                         |
|-------------------------------------|--------------------------------|
| !screenshot https://www.google.com/ | [Embeded screenshot of Website] |
 
 | Syntax              | Explaination                                                                    | Example(s)              |
|---------------------|---------------------------------------------------------------------------------|-------------------------|
| \<Full website URL> | The URL of the website to screenshot. Must be in full URL format (see example)! | https://www.google.com/ |

 
### **Urban \<phrase>**
---
> ##### Summary <p>
> This command utilizes the NPM Package "Urban-Dictionary" to allow users to input a phrase and get the Urban Dictionary definition of said phrase. Also reports Like/Dislike ratio. 
##### Example
| Input       | Output |
|-------------|--------|
| !urban LOL  | [embeded definition of LOL according to Urban Dictionary] |

| Syntax    | Explaination                       | Example(s)           |
|-----------|------------------------------------|----------------------|
| \<phrase> | Can be a word or phrase.           | LOL                  |
 
