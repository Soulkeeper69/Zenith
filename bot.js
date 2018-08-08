const discord = require(`discord.js`);
const bot = new discord.Client();
const fs = require(`fs`);
const moment = require(`moment`);
const config = require(`./storage/config.json`)
//*************************EVENT HANDLER**********************************//
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      // super-secret recipe to call events with all their proper arguments *after* the `client` var.
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
});
//*************************EVENT HANDLER**********************************//


//*************************COMMAND HANDLER**********************************//
bot.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args);
  } catch (err) {
    console.error(err);
  }
}); 
//*************************COMMAND HANDLER**********************************//



























bot.login(config.token)