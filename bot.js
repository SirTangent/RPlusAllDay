const eris = require('eris');
const logger = require('./logger');
require('dotenv').config();
const PREFIX = 'v!';
let mention_responses = ["Hey kid, want a vine?", "You 'member vine? I 'member!", "Vineeeee... livessss...", "Try saying a vine quote!"];
let comps = ["https://youtu.be/rnU-puAUMbs", "https://youtu.be/hBsP1N89pYU", "https://youtu.be/Z2s1qIBr-DU", "https://youtu.be/FZQE_aGJPoc", "https://www.youtube.com/watch?v=XeYbSxfwTgE", "https://youtu.be/wE891Z9gcXY"];

// Create a Client instance with our bot token.
const bot = new eris.Client(process.env.API_TOKEN || '');

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let vines = {
    "wednesday": "https://www.youtube.com/watch?v=du-TY1GUFGk",
    "chilis": "https://www.youtube.com/watch?v=WEGCAS8nCPU",
    "roommates": "https://www.youtube.com/watch?v=y-P0m0M_8pc",
    "bitch": "https://youtube.com/shorts/0QoHrMPaLUs?si=w-f5FeT_H7ZBGvQr",
    "tortilla": "https://youtube.com/watch?v=21jLmc_Il3o&list=PLA8U",
    "christmas": "https://youtube.com/watch?v=_Z-Nu351j58&list=PLA8U",
    "gay": "https://youtube.com/watch?v=EwAajOtfNT8&list=PLA8U",
    "suh": "https://youtube.com/watch?v=pIHYPaoh79I&list=PLA8U",
    "adam": "https://youtube.com/watch?v=kZSfPPJ4Fk8&list=PLA8U",
    "hello": "https://www.youtube.com/watch?v=YtSPQIK15uc",
    "21": "https://youtu.be/BzVXbeASRiQ",
    "dance": "https://youtu.be/ZkNMZlkrzaU",
    "croissant": "https://youtu.be/hRFUZBXOWZI",
    "weed": "https://youtu.be/FSpXiEK0qBg",
    "chickens": "https://youtu.be/NsLKQTh-Bqo",
    "wii": "https://youtu.be/ICEPXhZeEMU",
    "shots": "https://youtu.be/csn2CIWPVbM",
    "dollar store": "https://www.youtube.com/shorts/U0YBP1ve5rw",
    "kush": "https://www.youtube.com/shorts/U0YBP1ve5rw",
    "4x4": "https://www.youtube.com/shorts/GRuFdKL2yMw",
    "watermelon": "https://youtu.be/yd5fljg9-1Q",
    "ryan": "https://youtu.be/6fIZXRN4saM",
    "arkansas": "https://www.youtube.com/shorts/FPZi51GL3cs",
    "lebron": "https://youtube.com/shorts/ZeIr0FVJwGs",
    "gamecube": "https://youtu.be/DFzc3EsDaIw"
};

let vines_multi_word = [
    {"keyword": "road work", "url": "https://youtu.be/6AYv6rV3NXE"},
    {"keyword": "chicken nugget", "url": "https://youtu.be/3vB3-4ckglw"}
];

// When the bot is connected and ready, log to logger.
bot.on('ready', () => {
   logger.info('The boy is awake.');
   bot.editStatus("online",{name: "type v!help", type: 0});
});


bot.on('messageCreate', async (msg) => {
    if (msg.author.bot) {
        return;
    }

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
           logger.warn('Failed to respond to mention.');
           logger.warn(err);
       }
   }
   //Commands
   if(msg.content.startsWith(PREFIX)){
       var commandTxt = msg.content.substring(2);
       if(commandTxt == "help"){
           msg.channel.createMessage("LIST OF COMMANDS:\nv!help: list commands\nv!comp: get a vine compilation\nv!random: get a random vine\nv!day: Is it Wednesday?\nI also respond to keywords from famous vines!");
       }
       if(commandTxt == "comp"){
           msg.channel.createMessage(comps[Math.floor(Math.random() * comps.length)]);
       }
       if(commandTxt == "random"){
           msg.channel.createMessage("Here's a good one:\n" + vines[Math.floor(Math.random() * vines.length)].url);
       }
       if(commandTxt == "day"){
           let d = new Date();
           if(d.getDay() == 3){
               //It's Wednesday
               msg.channel.createMessage("Yep!");
               msg.channel.createMessage("https://www.youtube.com/watch?v=du-TY1GUFGk");
           }
           else{
               msg.channel.createMessage("Nope.");
               msg.channel.createMessage("It is " + weekdays[d.getDay()] + ", my dudes.");
               msg.channel.createMessage("aaaaaaAAAAAAA!");
           }
       }
   }

   let words = msg.content.toLowerCase().split(" ");
   for (let i = 0; i < words.length; i++) {
    let word = words[i];
    // exclude emotes
    if (word.startsWith(":") && word.endsWith(":"))
    {
        continue;
    }
    if (word in vines)
    {
        msg.channel.createMessage(vines[word]);
    }
   }

   for(let x = 0; x < vines_multi_word.length; x++){
    if(msg.content.toLowerCase().includes(vines_multi_word[x].keyword)){
        msg.channel.createMessage(vines_multi_word[x].url);
     }
    }

   if(msg.content.toLowerCase().includes("vine")){
       msg.addReaction("❤");
   }

   //Full shade, idgaf lol
   let cringe = ["tiktok", "x.com", "twitter"]
   for (let site of cringe) {
    if(msg.content.toLowerCase().includes(site)){
        msg.addReaction("😡");
        break;
    }
   }
});

bot.on('error', err => {
   logger.warn(err);
});

bot.connect();
