const discord = require(`discord.js`);
const bot = new discord.Client();
const fs = require(`fs`);
const moment = require(`moment`);
const modRole = `Administrator`;
const economy = require(`discord-eco`);

let userdata = JSON.parse(fs.readFileSync(`storage/userdata.json`, utf8)); 

bot.on(`message`, message => {


    //varibles
    let sender = message.autor; 
    let msg = message.content.toUpperCase();
    let prefix = `>`
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);


if (bot.user.id === message.author.id) {return}

//Events

if (!userdata[sender.id + message.guild.id]) userdata[sender.id + message.guild.id] = {}
if (!userdata[sender.id + message.guild.id].money) userdata[sender.id + message.guild.id].money = 2500; 
if (!userdata[sender.id + message.guild.id].lastdaily) userdata[sender.id + message.guild.id].lastdaily = 0;
if (!userdata[sender.id + message.guild.id].username) userdata[sender.id + message.guild.id].username = message.author.username;

fs.writefile(`storage/userdata.json`, JSON.stringify(userdata), (err) => {
    if (err) console.error(err);
})

//Commands

    //ping

    if (msg === prefix + `Ping`) {
        message.channel.send(`Pong`)
    }

// Add and Remove for admins

if (msg.startsWith(`${prefix}BALSET`)) {

if (!message.member.roles.find("name", modRole)) {
   message.channel.send(`**You need the role `' + modRole + '` to use this command...`);
   return;
}

if (!args[0]) {
    message.channel.send(`**You need to define an amount. Usage: ${prefix}BALSET <amount> <user>**`);
    return;
}

if (isNaN(args[0])) {
    message.channel.send(`**The amount has to be a number. Usage: ${prefix}BALSET <amount> <user>**`)
    return;
}

let defineduser = ``;
if (!args[1])
defineduser = message.author.id;

} else {
    let firstMentioned = message.mentions.users.first();
    defineduser = firstMentioned.id;

}

economy.updateBalance(defineduser + message.guild.id, parseINT(args[0])).then((i) => {
    message.channel.send(`**User defined had ${args[0]} added/subtracted from their account.**`)

}
}

    //Money
    if (msg === prefix + `MONEY` || msg === prefix + `BALANCE`) {
        message.channel.send({embed: {
            title: "Bank"
            color: 0xF1C40F,
            fields:[{
                name:"Account Holder",
                value:message.author.username,
                inline:true
            },
            {
                name:"Account Balance",
                value:userdata[sender.id + message.guild.id].money,
                inline:true
            }]
         }})
     } 

if (msg === prefix + `Daily`) {
    if (userdata[sender.id + message.guild.id].lastdaily != moment().format(`L`)) {
        userdata[sender.id + message.guild.id].lastdaily = moment().format(`L`)
        userdata[sender.id + message.guild.id].money +=500;
        message.channel.send({embed}:
            title:"Daily Reward",
            description:"You got $500 added to your account!"
            color: 0xF1C40F,

         }})


        } else {
            message.channel.send({embed:{
                title:"Daily Reward"
                description:"You already collected your daily reward! You can collect your next reward " + moment().endOf(`day`).fromNow() + `.`
                color: 0xF1C40F,

            }
            })

        } 


        //Guild info command

        if (msg === prefix + `GLOBAL`) {

            var globalmoney = 0;
            var globalUsers = 0;
            var globalRichest =0;
            var globalRiche$t = 0;

            for (var i in userdata) {
                    globalMoney += userdata[i].money;
                    globalUsers += 1; 
                    if (userdata[i]).money > globalRiche$t) {
                        globalRiche$t = userdata[1].money;
                        globalRichest = userdata[1].username;
                
                    }
             }        
    
        message.channel.send({embed: {
            title: "Global Stats"
            color: 0xF1C40F,
            fields:[{
                name:"Accounts",
                value:globalUsers,
                inline:true
            },
            {
                name:"Total Money",
                value:globalmoney,
                inline:true
            },
            ]
                name:"Richest Account",
                value:`${globalRichest} with ${globalRiche$t}`
            }]
        }})

}

        fs.writefile(`storage/userdata.json`, JSON.stringify(userdata), (err) => {
            if (err) console.error(err);
        })

})

bot.on(`ready`, () => {
    console.log(`economy launched...`)


})



