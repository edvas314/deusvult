const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const cron = require('cron');

const responses = fs.readFileSync('responses.txt').toString().split("\r\n")
const atresponses = fs.readFileSync('atresponses.txt').toString().split("\r\n");
var deus_counts = parseInt(fs.readFileSync('deus_counts.txt'));

const activities = fs.readFileSync('activities.txt').toString().split("\r\n");
const playing = fs.readFileSync('playing.txt').toString().split("\r\n");
const listening = fs.readFileSync('listening.txt').toString().split("\r\n");
const watching = fs.readFileSync('watching.txt').toString().split("\r\n");

const insults = fs.readFileSync('insults.txt').toString().split("\r\n")
const insultresponses = fs.readFileSync('insultresponses.txt').toString().split("\r\n")

const associatedwords = fs.readFileSync('associatedwords.txt').toString().split("\r\n")

const factoftheweek = fs.readFileSync('factoftheweek.txt').toString().split("\r\n")

const maybephrase = fs.readFileSync('maybephrase.txt').toString().split("\r\n")
const phrase = ("deus " && " vult");

bot.login(process.env.token); 
//bot.login(token)


//Bot on ready -----------------------------------------------------------------------------------------------------------------------------------
bot.on("ready", () => {
    console.log("------------------CODE START------------------")
    console.log("Bot " + bot.user.username + " is online");
    bot.user.setActivity('just crusade things', { type: 'PLAYING' })

    //Detect what Servers and Text channels the bot is in, create emoji --------------------------------------------------------------------------
    console.log("Servers:")
    bot.guilds.cache.forEach( guild => {
        console.log(" - " + guild.name)
        if (guild.emojis.cache.find(emoji => emoji.name === "DeusVult")){
            console.log('THE EMOJI IN THE SERVER EXISTS')
        }
        else {
            console.log('THERE IS NO DEUS VULT EMOJI')
            guild.emojis.create('DeusVult.png', 'DeusVult').then(emoji => console.log(`Emoji ${emoji.name} was created in ` + guild.name))
        }
    })
    console.log("Text Channels:")
    bot.channels.cache.forEach( channel => { 
        const channelid = bot.channels.cache.get(channel.id)
            if(channel.type === 'text'){
                console.log(" - " + channel.id)
    //Detect what Servers and Text channels the bot is in, create emoji --------------------------------------------------------------------------

                //Write random fact at same time every week --------------------------------------------------------------------------------------
                let randomfactoftheweek = new cron.CronJob('20 30 18 * * 5', () => {
                    channelid.send("Random crusade fact of the week: " + factoftheweek[Math.floor(Math.random() * factoftheweek.length)])
                });
                randomfactoftheweek.start()      
                //Write random fact at same time every week --------------------------------------------------------------------------------------

            }
    })
    
    //Activity change ----------------------------------------------------------------------------------------------------------------------------
    setInterval(() => {
        var activitytype = activities[Math.floor(Math.random() * activities.length)];
        console.log("Activity Type: " + activitytype.toUpperCase());
        switch (activitytype.toLowerCase().includes("listening")){
            case true:
                var listeningtype = listening[Math.floor(Math.random() * listening.length)];
                console.log("Listening type: " + listeningtype.toLowerCase());
                bot.user.setActivity(listeningtype.toLowerCase(), { type: 'LISTENING' });
            break;
            case false:
                switch (activitytype.toLowerCase().includes("watching")){
                    case true:
                        var watchingtype = watching[Math.floor(Math.random() * watching.length)];
                        console.log("Watching type: " + watchingtype.toLowerCase());
                        bot.user.setActivity(watchingtype.toLowerCase(), { type: 'WATCHING' });
                    break;
                    case false:
                        var playingtype = playing[Math.floor(Math.random() * playing.length)];
                        console.log("Playing type: " + playingtype.toLowerCase());
                        bot.user.setActivity(playingtype.toLowerCase(), { type: 'PLAYING' });
                }
        }
    }, 13.53*60*60*1000);
    //Activity change ----------------------------------------------------------------------------------------------------------------------------

})
//Bot on ready -----------------------------------------------------------------------------------------------------------------------------------


//Bot on any message -----------------------------------------------------------------------------------------------------------------------------
bot.on("message", msg => {
    var author = msg.member.user.username;
    switch (author === bot.user.username){
        case true:
        break;
        case false:
        console.log("----------CODE LOOP SART ON MESSAGE----------")
        console.log("There was a message");
        console.log("Message author: " + author);
        var msghasmention = msg.toString().includes("@");
        console.log("Any mention: " + msghasmention);
        switch(msghasmention){
            case false:

                //Reacting to assoiciated things with emoji --------------------------------------------------------------------------------------
                for (var i = 0; i < associatedwords.length; i++) {
                    if (msg.content.includes(associatedwords[i])) {
                        console.log("THERE WAS AN ASSOCIATED WORD")
                        const emoji = msg.guild.emojis.cache.find(emoji => emoji.name === "DeusVult")
                        msg.react(emoji)
                        break;
                    }
                }
                //Reacting to assoiciated things with emoji --------------------------------------------------------------------------------------

                //Reacting to a Deus Vult typo ---------------------------------------------------------------------------------------------------
                for (var p = 0; p < maybephrase.length; p++) {
                    if (msg.content.includes(maybephrase[p]) && (author != bot.user.username)) {                  
                        console.log("THE PHRASE MAYBE WAS THERE");
                        deus_counts = deus_counts + 1;
                        console.log("Deus counts: " + deus_counts);
                        const emoji = msg.guild.emojis.cache.find(emoji => emoji.name === "DeusVult")
                            msg.react(emoji)
                        msg.channel.send("Did I see a 'Deus Vult' somewhere?");
                        fs.writeFile('deus_counts.txt', deus_counts.toString(), (err) => { 
                            if (err) throw err;
                        });
                        break;
                    }
                }
                //Reacting to a Deus Vult typo ---------------------------------------------------------------------------------------------------

                //Deus Vult bulshit --------------------------------------------------------------------------------------------------------------
                if((msg.content.toLowerCase().includes(phrase.toLowerCase())) && (author != bot.user.username)){
                    console.log("THE PHRASE WAS THERE");
                    deus_counts = deus_counts + 1;
                    console.log("Deus counts: " + deus_counts);
                    console.log("Divides: " + Number.isInteger(deus_counts/27));
                    var hectar_percent = (deus_counts*49)/12510;
                    console.log("Hectar percent: " + hectar_percent.toFixed(3));
                    var hectars = ("That's " + (deus_counts) + " Holy Battle Cries recorded! We are at " + hectar_percent.toFixed(3) 
                    +"% of our goal to reclaim the 12,510 hectares of the Holy Land. We shall take Jerusalem!");
                    fs.writeFile('deus_counts.txt', deus_counts.toString(), (err) => { 
                        if (err) throw err;
                    });
                    if(Number.isInteger(deus_counts/27)){
                        msg.channel.send(hectars);
                    }        
                    else {
                        msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
                    }
                }
                //Deus Vult bulshit --------------------------------------------------------------------------------------------------------------

            console.log("----------------CODE LOOP END----------------")    
            break; 
            case true:
                var mention = msg.mentions.users.first();
                console.log("Person mention: " + mention);
                var role = msg.mentions.roles.first();
                console.log("Role mention: " + role);
                switch (mention === undefined){
                    case false:  

                        //Response when the Bot is mentioned -------------------------------------------------------------------------------------  
                        var FirstName = msg.mentions.users.first().username
                        console.log("Mentionade name: " + FirstName);
                        if((FirstName === bot.user.username) && (author != bot.user.username)){
                            var insultmeter = false
                            for (var u = 0; u < insults.length; u++) {
                                if (msg.content.includes(insults[u])) {
                                    var insultmeter = true
                                    console.log("THERE WAS AN INSULT")
                                    msg.reply(insultresponses[Math.floor(Math.random() * insultresponses.length)])
                                    msg.delete()
                                break;
                                }
                            }
                            if((insultmeter === false) && (author != bot.user.username)){
                                console.log("THE MENTION WAS HIM")
                                msg.reply(atresponses[Math.floor(Math.random() * atresponses.length)])
                            }
                        }
                        //Response when the Bot is mentioned -------------------------------------------------------------------------------------

                    console.log("----------------CODE LOOP END----------------")    
                    break;
                    case true:

                        //Response when the Bot role is mentioned --------------------------------------------------------------------------------  
                        var FirstRole = msg.mentions.roles.first().name
                        console.log("Mentioned Role: " + FirstRole);
                        if((FirstRole === bot.user.username) && (author != bot.user.username)){
                            var insultmeter = false
                            for (var u = 0; u < insults.length; u++) {
                                if (msg.content.includes(insults[u])) {
                                    var insultmeter = true
                                    console.log("THERE WAS AN INSULT")
                                    msg.reply(insultresponses[Math.floor(Math.random() * insultresponses.length)])
                                    msg.delete()
                                break;
                                }
                            }
                            if((insultmeter === false) && (author != bot.user.username)){
                                console.log("THE MENTION WAS HIM")
                                msg.reply(atresponses[Math.floor(Math.random() * atresponses.length)])
                            }
                        };
                        //Response when the Bot role is mentioned --------------------------------------------------------------------------------
                        
                    console.log("----------------CODE LOOP END----------------")
                }
        
        }
    }    
})  
//Bot on any message -----------------------------------------------------------------------------------------------------------------------------