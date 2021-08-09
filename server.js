const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const ytdl = require("ytdl-core");
const Hypixel = require("hypixel-api-reborn");
const hypixel = new Hypixel.Client(config.hypixelapi);
const hypixelCommands = require("./commands/hypixelCommands.js");
const randomNumber = require("./commands/random number.js");
const perfHooks = require("perf_hooks");
const fetch = require("node-fetch");

//npm install discord.js-commando
//npm install discord.js
//npm install ytdl-core
//npm install hypixel-api-reborn


client.once("ready", message => {
  console.log("Bot準備完了～");
  client.user.setPresence({ game: { name: "Bedwars 4v4v4v4" } });
});



if (config.token == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(config.token);

function sendDMMsg (userID , content) {
  client.users.cache.get(userID).send(content)
};

function sendMsg (channelID , content) {
  client.channels.cache.get(channelID).send(content)
};


client.on("presenceUpdate" , (oldPresence , newPresence) =>{
  let yamato = oldPresence.user.id
  let oldStatus = oldPresence.status;
  let newStatus = newPresence.status;
if(yamato != "738763915994857563") return;
if(oldStatus != "online"){
  sendDMMsg("739006634533060702" ,`大和さんが${oldStatus}から${newStatus}になりました！`)
}
});


/*
client.on("message" , async msg =>{
  if(msg.content.match(prefix + "clear")){
    msg.reply("いくつメッセージを削除しますか？");
    var filter = msg2 => msg2.author.id === msg.author.id;
    var collected = await msg.channel.awaitMessages(filter, {max: 1, time: 10 * 1000})
    var response = collected.first()
    if(!response){
      msg.reply("タイムアウトしました。\n最初からやり直してください")}else{
        var intNum = parseInt(response.content);
      if(Number.isFinite(intNum) && 0< intNum){
        if(response.content <101){
          var delNumber = intNum + 1;
          response.channel.bulkDelete(delNumber)
          .then(response.reply(delNumber + "個のメッセージを削除しました。"))
        }else{
          return response.reply("数がでかすぎます。\n数値を100以下にしてください。\n最初からやり直してください")
        }
      }else{
        msg.reply("自然数を入力してください。\n最初からやり直してください")
      }
    }
  }});
  */
/*
client.on("message" , async msg =>{
  if(msg.content === "embed"){msg.channel.send({
    embed: {
      title: 'メッセージ削除の確認',
      fields: [{ name: `あなたは個のメッセージを削除しようとしています。`, value: '本当に削除しますか？\n削除する場合は✓を、キャンセルする場合は×を選択してください。' }],
      color: 4303284
    }})
  .then(msg2 =>{
    msg2.react("✅")
    .then(msg2.react("❌"))
    client.on("messageReactionAdd" , (reaction, user) =>{
      if(user.id === msg.author.id){
        msg.channel.send(`${reaction.emoji.name} をリアクションしました`)
      }})
  })}});
/*
client.on("presenceUpdate" , (oldPresence , newPresence) =>{
 // let puser = oldPresence.user.id
  let oldStatus = oldPresence.status;
  let newStatus = newPresence.status;
//if(puser != "738763915994857563") return;
if(oldStatus != "online" && newStatus === "online" ){
  let ch = client.channels.cache.get("786221980650700800")
  ch.send(`<@739006634533060702>大和さんが${oldStatus}から${newStatus}になりました！`)
  discord.DMChannel()
}
});
*/
/*
client.on("message" , msg =>{
  if(!msg.content.startsWith(prefix + "mcid")) return;
    let mcid = msg.content.split(" ");
    let playerName = mcid[1];
    hypixel.getPlayer(playerName)
    .then(player =>{
      msg.channel.send(player.level);
    })
});

client.setInterval(() => {
  let ch = client.channels.cache.get("786221980650700800");
  hypixel.getWatchdogStats().then(wdr =>{
    let wdrd = wdr.byWatchdogRollingDay;
    let std = wdr.byStaffRollingDay;
    let emb = new discord.MessageEmbed()
    .setColor("#FF0000")
                  .setTitle("Ban人数情報")
                  .setDescription("24時間以内にBanされた人数を表示します")
                  .addFields({name : "WatchdogによるBan" , value : `${wdrd}人` } , {name : "スタッフによるBan" , value : `${std}人`})
                  .setFooter("24時間ごとに更新されます")
                  .setTimestamp();
  ch.send(emb);
  })
},  10*1000);

*/



/*
function banInfo () {
  let ch = client.channels.cache.get("786221980650700800");

  hypixel.getWatchdogStats().then(wdr => {
    let wdrd = wdr.byWatchdogRollingDay;
    let std = wdr.byStaffRollingDay;
    let emb = new discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Ban人数情報")
      .setDescription("24時間以内にBanされた人数を表示します")
      .addFields(
        { name: "WatchdogによるBan", value: `${wdrd}人`, inline: true },
        { name: "スタッフによるBan", value: `${std}人`, inline: true }
      )
      .setFooter("24時間ごとに更新されます")
      .setTimestamp();
      console.log(emb);
  });
};



client.setTimeout(() =>
 {banInfo();
  client.setInterval(() => {
    banInfo();
  } , 1 * 1 * 20 * 1000);
} , new Date().setHours(12, 0, 0, 0) - new Date());


*/


client.on("message" , msg => {
  if(msg.channel.id !== "859214771454607380") return;
  if(msg.author.bot) return;
  if(!msg.content.startsWith(prefix + "hp")) return;
  hypixelCommands.call(msg);
});



client.on("message" , msg =>{
  if(msg.author.bot) return;
  if(msg.channel.type !== "dm") return;
  sendDMMsg(config.ponDMID , `send by ${msg.author.username} \n${msg}`)
  });

  
/*
client.on("typingStart" , (channel , user) => {
    if(!channel.id == "786221980650700800") return;
    let userName = user.username;
    sendMsg(channel.id , `${userName}様がタイピングしています。`)
  });
  */

client.on ("message" , msg => {
  if (!msg.content.startsWith(prefix + "rn")) return;
  randomNumber.call(msg)
});

client.on("typingStart" ,async (channel , user) => {
  if (channel.id !== "789853329147559986") return;
  let startTime = perfHooks.performance.now();
  console.log(startTime)
  let filter = msg2 => msg2.author.id === user.id;
  channel.awaitMessages(filter , {max : 1})
  .then(() =>{
    let endTime = perfHooks.performance.now();
    console.log(endTime)
    let mTime = endTime - startTime;
    let Time = mTime / 1000;
    channel.send(`あなたのタイピング時間は${Time}秒です。`)    }
  )
});

let transMap = new Map();

client.on("message", msg => {
  if(msg.author.bot) return;
  if(msg.content !== `${prefix}translate on`) return;
  return transMap.set(msg.author.id, true);
});

client.on("message", msg => {
  if(msg.author.bot) return;
  if(msg.content !== `${prefix}translate off`) return;
  return transMap.set(msg.author.id, false);
});

client.on("message", msg => {
  if(!transMap.get(msg.author.id)) return;
  if(msg.content == `${prefix}translate on`) return;
  if(msg.content == `${prefix}translate off`) return;
  if(msg.author.bot) return;
  let content = msg.content;
  let url = (`https://script.google.com/macros/s/AKfycbyeqscZvWix-RomnfPGiy1rCfMeVVd-vKtcdii_zpMWR2HF1Wf_IPt7o150gPyI1oEs/exec?text=${encodeURIComponent(content)}&source=ja&target=en`)
  fetch(url).then(res => res.json()).then(data => {
    msg.channel.send(data.text)
  })
});