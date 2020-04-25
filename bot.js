const Discord = require('discord.js');
const client = new Discord.Client();
const response = ["It's Gods will!",
"We shall take back Jerusalem!",
"DEUS VULT!",
"Smite the heathans!",
"We shall reclaim the Holy Land!",
"Victory is at our side!",
"For honor!",
"Jerusalem is ours!",
"Baptize the heathans!",
"God is at our side!",
"Nothing shall stop the crusade!",
"May God be our witness!",
"Holy words!",
"We shall prevail!",
"At Gods command!",
"For the crusade!",
"Onwards!"];
const deus = "deus vult";

// Readyness announcment
client.on("ready",() => {
    console.log("Bot is online");
})
// Readyness announcment

// Response message
client.on("message", msg =>{
    if(msg.content.toLowerCase().includes(deus.toLowerCase())){
        msg.channel.send(response[Math.floor(Math.random() * response.length)]);
    }
})
// Response message

client.login(process.env.token);
