const discord = require(`discord.js`);
const mysql = require(`mysql`);
const poolQuery = require(`./../functions/poolQuery`);
exports.run = async (bot,message,args) => {
    var userid = message.author.id
    const connect = async function(){
        poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result =>{
            let userdata = result[0];
            let currentmoney = userdata.money;
            const embed = new discord.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription(`Your current balance of tormented Souls is ${currentmoney}`)
                .setColor(0xFFA464)    
            message.channel.send(embed)              
        });
    }
    connect();
}