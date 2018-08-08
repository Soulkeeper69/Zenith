const Discord = require(`discord.js`)
const fs = require(`fs`)
exports.run = async (bot, message, args) => {
    let userdata = JSON.parse(fs.readFileSync(`./storage/userdata.json`, { encoding: 'utf8' }));
    let userkey = message.author.id + message.guild.id 
    let dailycheck = ((Date.now() - userdata[userkey].lastdaily) >= 86400000) ? "go" : "nogo"
    
    if (userdata[userkey].lastdaily === 0 || dailycheck === "go"){
        
        userdata[userkey].money += 500
        userdata[userkey].lastdaily = Date.now()
        
        fs.writeFile(`./storage/userdata.json`, JSON.stringify(userdata), (err) => {
            message.channel.send (` :tada: You collected your daily all by yourself :laughing:.`) 
            if(err) console.error(err);  
        })
    }
    else if (dailycheck === "nogo") {
        message.channel.send(`Sorry, You are not able to collect your daily right now!!`)
    }
};