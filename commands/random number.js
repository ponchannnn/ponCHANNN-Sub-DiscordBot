const discord = require("discord.js");
const client = new discord.Client();
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    call : call
}

function call (msg) {
    let args = msg.content.split(" ");
    let times = args[1]
    if(!times) {times = 100};
    let randomNumber = Math.floor(Math.random() * times);
    msg.channel.send(randomNumber);
}