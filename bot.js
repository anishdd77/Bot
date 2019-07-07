
 const yourID = "484326398568300555"; 
const setupCMD = "#reacon"//الرساله لتشغيل امر الرياكشن
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Fortnite", "Pubg", "Brawlhalla", "Minecraft", "Apex-Legend", "Cs:Go", "Paladins", "Half life", "LOL", "COD", "BattleField", "Rinbow 6", "Black Squad", "Dofus", "Overwatch"];//الرتب الي يعطيها البوت يمديك تعدل
const reactions = [":Fortnite: ", ":Pubg:", ":Brawhalla:", ":mincrafte:", ":apex:", ":csgo:", ":paladins:", ":halflife:", ":lol:" , ":cod:", ":battlefield:", ":rin6:", ":blacksquad:", "dofus", "overwatch" ];//الايموجي الي يعطي رياكشن بس كل رتبه لها رياكسن بالترتيب 
const botToken = "NTgwODI5NzQxNDk4NjMwMTky.XR-N6g.JlTan9J5MqkrVU0OeewIeK7tCOY";  

const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login(botToken);

if (roles.length !== reactions.length) throw "__**Gaming Roles**__";
//لالالالالا نغير شي ابداا
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`*React below to get the*, **"${role}"** ,*role!*`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
