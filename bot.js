const eris = require('eris');
require('dotenv').config();
const PREFIX = 'v!';
let mention_responses = ["Hey kid, want a vine?", "You 'member vine? I 'member!", "Vineeeee... livessss...", "Try saying a vine quote!"];
let comps = ["https://youtu.be/rnU-puAUMbs", "https://youtu.be/hBsP1N89pYU", "https://youtu.be/Z2s1qIBr-DU", "https://youtu.be/FZQE_aGJPoc", "https://www.youtube.com/watch?v=XeYbSxfwTgE"];

// Create a Client instance with our bot token.
const bot = new eris.Client(process.env.API_TOKEN || '');

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
           msg.channel.createMessage("LIST OF COMMANDS:\nv!help: list commands\nv!comp: get a vine compilation\nI also respond to keywords from famous vines!");
       }
       if(commandTxt == "comp"){
           msg.channel.createMessage(comps[Math.floor(Math.random() * comps.length)]);
       }
   }

   if(msg.content.toLowerCase().includes('wednesday')){
       msg.channel.createMessage('https://youtu.be/du-TY1GUFGk');
    }

    // Get the quote algorithm
    var input = msg.content.toLowerCase();
    for (x of input.split(" ")) {
        console.log(x);

    }
});



bot.on('error', err => {
   console.warn(err);
});

bot.connect();
