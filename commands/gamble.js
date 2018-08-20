const discord = require(`discord.js`);
const fs = require(`fs`);
const mysql = require(`mysql`);
const poolQuery = require(`./../functions/poolQuery`);
exports.run = async(bot,message,args) => {
    var userid = message.author.id

    if(!args[0]) return message.channel.send(`You need to make a bet, you goof!!`);
    poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result => {
        let userdata = result[0];
        let currentmoney = parseInt(userdata.money)
        var moneyBet = parseInt(args[0])

        if (isNaN(moneyBet))return message.reply("Bet must be a number, Not a letter!")

        if (currentmoney < moneyBet);
        return message.channel.send("You dont have enough Souls for that bet");
    
        var number = Math.floor(Math.random() * 100 + 1);

        if (number > 50){
            var embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setTitle("You Won!")
            .setColor(0x00FF00)
            .setDescription(`You rolled a ${number} and won $${moneyBet}`)
            message.channel.send(embed)
            poolQuery(`UPDATE econ SET bal = ${currentmoney + moneyBet} WHERE userid = '${userid}'`)
        }else{
            var embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setTitle("You Lost!")
            .setColor(0xFF0000)
            .setDescription(`You rolled a ${number} and lost $${moneyBet}`)
            message.channel.send(embed)
            poolQuery(`UPDATE econ SET bal = ${currentmoney - moneyBet} WHERE userid = '${userid}'`)
        } 
    })
}