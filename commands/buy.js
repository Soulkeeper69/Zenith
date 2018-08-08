const items = JSON.parse(fs.readFileSync(`items.json`, `utf8`));
const fs = require(`fs`),


if (msg.startsWith(`${prefix}BUY`)) {

    let catergories = [];

    if (!args.join(" ")) {

    for (var i in items) {
        if (!catergories.includes(items[i].type)) {
            catergories.push(items([i]).type)
        }
    }

    const embed = new Discord.RichEmbed()
        .setdescription(`Available Items`)
        .setColor(0xFF0000)

    for (var i = 0; i < catergories.length; i++) {

        var tempDesc = ``;

        for (var i in items) {
            if (catergories[i] === items[c].type) {
                tempDesc += `${items[c].name - $${items[c].price - ${items[c].desc}\n`};

            }
        }

        embed.addField(catergories[i], tempDesc);

    }
    
        return message.channel.send({embed})
    
 

        let itemName = ``;
        let itemPrice = ``;
        let itemDesc = ``;

        for (var i in items) {
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) {
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;

            }
        }

        if (itemName === ``) {
            return message.channel.send(`**Item ${args.join(" ").trim()} not found.**`)
        }

        economy.fetchBalance(userKey).then((i) => {
            if (i.money < itemPrice) {
                return message.channel.send(`**You do not have enough money for this item.**`);

            }

            economy.updateBalance(userKey, parseInt(`-${itemPrice`)).then(() => ) {

                message.channel.send(`**You bought : + itemName + '!**'`);
                 
            //if statements next for when they buy items


            }
        })
}

}