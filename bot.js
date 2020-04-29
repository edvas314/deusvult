const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const responses = fs.readFileSync('responses.txt').toString().split("\n")
const atresponses = fs.readFileSync('atresponses.txt').toString().split("\n");
var deus_counts = parseInt(fs.readFileSync('deus_counts.txt'));

bot.on("ready",() => {
    console.log("Bot is online");
})
bot.on('message', msg => {
    console.log("There was a message");
    var author = msg.member.user.username;
    console.log("Message author: " + author);
    var msghasmention = msg.toString().includes("@");
    console.log("Any mention: " + msghasmention);
    switch(msghasmention){
        case false:
            const phrase = ("deus vult");
            if((msg.content.toLowerCase().includes(phrase.toLowerCase())) && (author != "TestyBoi")){
                console.log("THE PHRASE WAS THERE");
                deus_counts = deus_counts + 1;
                console.log("Deus counts: " + deus_counts);
                console.log("Divides: " + Number.isInteger(deus_counts/27));
                var hectar_percent = (deus_counts*49)/12510;
                console.log("Hectar percent: " + hectar_percent.toFixed(3));
                var hectars = ("That's " + (deus_counts) + " Holy Battle Cries recorded! We are at " + hectar_percent.toFixed(3) +"% of our goal to reclaim the 12,510 hectares of the Holy Land. We shall take Jerusalem!");
                fs.writeFile('deus_counts.txt', deus_counts.toString(), (err) => { 
                    if (err) throw err;
                });
                if(Number.isInteger(deus_counts/27)){
                    msg.channel.send(hectars);
                }        
                else {
                    msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
                }
            };
        break; 
        case true:
            var mention = msg.mentions.users.first();
            console.log("Person mention: " + mention);
            var role = msg.mentions.roles.first();
            console.log("Role mention: " + role);
            switch (mention === undefined){
                case false:    
                    var FirstName = msg.mentions.users.first().username
                    console.log("Mentionade name: " + FirstName);
                    if((FirstName === "TestyBoi") && (author != "TestyBoi")){
                        console.log("THE MENTION WAS HIM")
                        msg.reply(atresponses[Math.floor(Math.random() * atresponses.length)])
                    };
                break;
                case true:   
                    var FirstRole = msg.mentions.roles.first().name
                    console.log("Mentioned Role: " + FirstRole);
                    if((FirstRole === "TestyBoi") && (author != "TestyBoi")){
                        console.log("THE MENTION WAS HIM")
                        msg.reply(atresponses[Math.floor(Math.random() * atresponses.length)])
                    };
            }
        
    }
})  

bot.login(process.env.token);
