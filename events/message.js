const discord = require(`discord.js`);
const mysql = require("mysql");
const poolQuery = require('./../functions/poolQuery');
exports.run = async (bot, message) => {
    if (message.author.bot)return;
    const userid = message.author.id
    var messagetime = Date.now()
    const connect = async function () {
        poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result =>{
            if(Object.keys(result).length == 0) {
                poolQuery(`INSERT INTO econ (userid,userName,money,lastMessage) VALUES ('${userid}','${message.author.username}',2500,'${messagetime}')`).then(()=>{
                    message.channel.send(`${message.author.username} your profile has been created :tada:`)
                    connect();
                });//insert catch here if new user fails
            }else {
                let userdata = result[0]
                let currentmoney = userdata.money
                var rewardamount = Math.floor(Math.random() * 99) + 1
                var newmoney = Math.floor(userdata.money + rewardamount) 
                
                poolQuery(`UPDATE econ SET money = '${newmoney}' WHERE userid = '${userid}'`).then(()=>{
                    bot.guilds.get("379115766127001600").channels.get("476624950048849920").send(`${message.author.username} now has ${newmoney} Cookies`)
                });//insert catch here if update of user fails
            }
        });
    }
    connect();   
}