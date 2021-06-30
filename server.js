const querystring = require("querystring");
const path = require("path");
const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const settings = require("./settings.json");
const ytdl = require("ytdl-core");

const Hypixel = require("hypixel-api-reborn");
const hypixel = new Hypixel.Client(config.hypixelapi);
const hypixelCommands = require("./commands/hypixelCommands.js")

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



/*
client.on("message" , async msg =>{
  if(msg.content.match(prefix + "clear")){
    msg.reply("いくつメッセージを削除しますか？");
    var filter = msg2 => msg2.author.id === msg.author.id;
    var collected = await msg.channel.awaitMessages(filter, {max: 1, time: 10 * 1000})
    var response = collected.first()
    if(!response){
      msg.reply("タイムアウトしました。\n最初からやり直してください")}else{
        var intNum = parseInt(response.content);８
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

client.on("message", async msg => {
  if (msg.content === "embed") {
    msg.channel
      .send({
        embed: {
          title: "メッセージ削除の確認",
          fields: [
            {
              name: `あなたは個のメッセージを削除しようとしています。`,
              value:
                "本当に削除しますか？\n削除する場合は✓を、キャンセルする場合は×を選択してください。"
            }
          ],
          color: 4303284
        }
      })
      .then(msg2 => {
        msg2.react("✅").then(msg2.react("❌"));
        client.on("messageReactionAdd", (reaction, user) => {
          if (user.id === msg.author.id) {
            msg.channel.send(`${reaction.emoji.name} をリアクションしました`);
          }
        });
      });
  }
});
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
client.on("message", msg => {
  if (!msg.content.startsWith(prefix + "mcid")) return;
  let mcid = msg.content.split(" ");
  let playerName = mcid[1];
  hypixel.getPlayer(playerName).then(player => {
    msg.channel.send(player.level);
  });
});

function banInfo () {
  let ch = client.channels.cache.get("858655976718204971");

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
    ch.send(emb);
  });
};



client.setTimeout(() =>
 {banInfo();
  client.setInterval(() => {
    banInfo();
  } , 24 * 60 * 60 * 1000);
} , new Date().setHours(12, 0, 0, 0) - new Date());





client.on("message" , msg => {
  if(msg.channel.id !== "859214771454607380") return;
  if(msg.author.bot) return;
  if(!msg.content.startsWith(prefix + "hp")) return;
  hypixelCommands.call(msg);
});