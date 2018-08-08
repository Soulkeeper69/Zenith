const Discord = require(`discord.js`)
const fs = require(`fs`)
const mysql = require(`mysql`)
const poolQuery = require('./../functions/poolQuery');
exports.run = async (bot, message, args) => {
    var userid = message.author.id
    var messagetime = Date.now()
    const connect = async function(){
        poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result =>{
            var userdata = result[0]
            var timesincedaily = Math.floor(Date.now() - userdata.lastDaily) / 3600000 //hrs
            var timetilldaily = Math.round(24 - timesincedaily)

            if (timesincedaily < 24){
                message.channel.send(`You must wait ${timetilldaily} hrs before claiming daily again`)
            } else {
                var currentmoney = userdata.money
                var reward = 500
                var newmoney = userdata.money
                
                poolQuery(`UPDATE econ SET money = '${newmoney}', lastDaily = '${messagetime}' WHERE userid = ${userid} `).then(()=>{
                    message.channel.send(`You claimed ${reward} souls for your daily reward!`)
                }).catch(() => {
                    console.log(`${message.author.username}Daily Failed To Update`)
                });
            }
        }).catch(() => {
            console.log(`${message.author.username} Daily Profile Couldnt Be Found`)
        });
    }
    connect();
}