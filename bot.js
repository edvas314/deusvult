const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs')
const responses = fs.readFileSync('responses.txt').toString().split("\n")
var deus_counts = parseInt(fs.readFileSync('deus_counts.txt'));
var hectar_percent = (deus_counts*49)/12510;
const phrase = ("deus vult");
var hectars = ("That's " + deus_counts + " Holy Battle Cries recorded! We are at " + hectar_percent.toFixed(3) +"% of our goal to reclaim the 12,510 hectares of the Holy Land. We shall take Jerusalem!");
const atdeusvult = ("@Deus Vult");
const atresponses = fs.readFileSync('atresponses.txt').toString().split("\n");

// Ready
bot.on("ready",() => {
    console.log("Bot is online");
})
// Ready

// Response message; deus_counts +1; save to file
bot.on("message", msg =>{
    if(msg.content.includes(atdeusvult)){
        msg.reply(atresponses[Math.floor(Math.random() * atresponses.length)])
    }
    else {
        if(msg.content.toLowerCase().includes(phrase.toLowerCase())){
            deus_counts = deus_counts + 1;
            console.log(deus_counts);
            console.log(Number.isInteger(deus_counts/27));
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
    }    
})
// Response message; deus_counts +1; save to file

bot.login(process.env.token);
