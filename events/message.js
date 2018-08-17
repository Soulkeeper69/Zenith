const discord = require(`discord.js`);
const mysql = require("mysql");
const poolQuery = require('./../functions/poolQuery');
const fs = require(`fs`)
exports.run = async (bot, message) => {
    if (message.author.bot)return;
    const userid = message.author.id
    var messagetime = Date.now()
    const connect = async function () {
        poolQuery(`SELECT * FROM econ WHERE userid = '${userid}'`).then(result =>{
            if(Object.keys(result).length == 0) {
                poolQuery(`INSERT INTO econ (userid,userName,money,lastDaily,lastMessage) VALUES ('${userid}','${message.author.username}',2500,0,'${messagetime}')`).then(()=>{
                    message.channel.send(`${message.author.username} your profile has been created :tada:`)
                    connect();
                }).catch(() => {
                    console.log(`${message.author.username} Profile Failed To Be Created`)
                });
            }else {
                let userdata = result[0]
                let currentmoney = userdata.money
                var rewardamount = Math.floor(Math.random() * 99) + 1
                var newmoney = Math.floor(userdata.money + rewardamount)
                var timesincemessage = Math.floor(messagetime - userdata.lastMessage) / 1000
                if (timesincemessage >= 20){
                    poolQuery(`UPDATE econ SET money = '${newmoney}', lastMessage = '${messagetime}' WHERE userid = '${userid}'`).then(()=>{
                        bot.guilds.get("399313430496018433").channels.get("476624950048849920").send(`${message.author.username} now has ${newmoney} Souls`)
                    }).catch(() => {
                        console.log(`${message.author.username} Profile Failed To Update`)
                    });
                }                
            }
        });
    }   
    connect();   
}

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  
  });

  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);