const Discord = require(`discord.js`);
const fs = require(`fs`);
const mysql = require(`mysql`);
const poolQuery = require(`./../functions/poolQuery`);
exports.run = async(bot,message,args) => {
    var userid = message.author.id

    if(!args[0])
    return message.channel.send(`You need to make a bet, you goof!!`)



    const connect = async function(){
        poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result => {
            let userdata = result[0];
            let currentmoney = userdata.money

            if (currentmoney < args[0]);
            return message.channel.send("You dont have enough Souls for that bet")

            message.channel.send('Rolling dice..').then(msg => {
                var number = Math.round(Math.random() * 100); if(number === 0) number = 1;
                msg.edit("You rolled " + number)
            })
        })

    }
    
}