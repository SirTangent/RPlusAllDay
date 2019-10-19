const eris = require('eris');
require('dotenv').config();
const PREFIX = 'v!';
let mention_responses = ["Hey kid, want a vine?", "You 'member vine? I 'member!", "Vineeeee... livessss...", "Try saying a vine quote!"];
let comps = ["https://youtu.be/rnU-puAUMbs", "https://youtu.be/hBsP1N89pYU", "https://youtu.be/Z2s1qIBr-DU", "https://youtu.be/FZQE_aGJPoc", "https://www.youtube.com/watch?v=XeYbSxfwTgE"];

// Create a Client instance with our bot token.
const bot = new eris.Client(process.env.API_TOKEN || '');

let vines =[
    {
        "keyword": "wednesday",
        "url": "https://www.youtube.com/watch?v=du-TY1GUFGk"
    },
    {
        "keyword": "chili's",
        "url": "https://www.youtube.com/watch?v=WEGCAS8nCPU"
    },
    {
        "keyword": "i love you",
        "url": "https://www.youtube.com/watch?v=psxBizrPIxg"
    },
    {
        "keyword": "roommates",
        "url": "https://www.youtube.com/watch?v=y-P0m0M_8pc"
    },
    {
        "keyword": "bad bitch",
        "url": "https://www.youtube.com/watch?v=GaNGKD4MTV0"
    },
    {
        "keyword": "tortilla",
        "url": "https://youtube.com/watch?v=21jLmc_Il3o&list=PLA8U"
    },
    {
        "keyword": "christmas",
        "url": "https://youtube.com/watch?v=_Z-Nu351j58&list=PLA8U"
    },
    {
        "keyword": "gay",
        "url": "https://youtube.com/watch?v=EwAajOtfNT8&list=PLA8U"
    },
    {
        "keyword": "suh",
        "url": "https://youtube.com/watch?v=pIHYPaoh79I&list=PLA8U"
    },
    {
        "keyword": "adam",
        "url": "https://youtube.com/watch?v=kZSfPPJ4Fk8&list=PLA8U"
    },
    {
        "keyword": "hello",
        "url": "https://www.youtube.com/watch?v=YtSPQIK15uc"
    },
    {
        "keyword": "twenty one",
        "url": "https://youtu.be/BzVXbeASRiQ"
    },
    {
        "keyword": "road work",
        "url": "https://youtu.be/6AYv6rV3NXE"
    },
    {
        "keyword": "dance",
        "url": "https://youtu.be/ZkNMZlkrzaU"
    },
    {
        "keyword": "croissant",
        "url": "https://youtu.be/hRFUZBXOWZI"
    },
    {
        "keyword": "weed",
        "url": "https://youtu.be/FSpXiEK0qBg"
    },
    {
        "keyword": "chickens",
        "url": "https://youtu.be/NsLKQTh-Bqo"
    },
    {
        "keyword": "child",
        "url": "https://youtu.be/FyH7QThXgPE"
    },
    {
        "keyword": "wii",
        "url": "https://youtu.be/ICEPXhZeEMU"
    }
]

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
   console.log('The boy is awake.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
   const botWasMentioned = msg.mentions.find(
       mentionedUser => mentionedUser.id === bot.user.id,
   );

   if (botWasMentioned) {
       try {
           await msg.channel.createMessage(mention_responses[Math.floor(Math.random() * mention_responses.length)]);
       } catch (err) {
           // There are various reasons why sending a message may fail.
           // The API might time out or choke and return a 5xx status,
           // or the bot may not have permission to send the
           // message (403 status).
           console.warn('Failed to respond to mention.');
           console.warn(err);
       }
   }
   //Commands
   if(msg.content.startsWith(PREFIX)){
       var commandTxt = msg.content.substring(2);
       if(commandTxt == "help"){
           msg.channel.createMessage("LIST OF COMMANDS:\nv!help: list commands\nv!comp: get a vine compilation\nv!random: get a random vine\nI also respond to keywords from famous vines!");
       }
       if(commandTxt == "comp"){
           msg.channel.createMessage(comps[Math.floor(Math.random() * comps.length)]);
       }
       if(commandTxt == "random"){
           msg.channel.createMessage("Here's a good one:\n" + vines[Math.floor(Math.random() * vines.length)].url);
       }
   }

   for(let x = 0; x < vines.length; x++){
    if(msg.content.toLowerCase().includes(vines[x].keyword)){
        msg.channel.createMessage(vines[x].url);
     }
   }
});

bot.on('error', err => {
   console.warn(err);
});

bot.connect();
