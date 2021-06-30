const querystring = require("querystring");
const path = require("path")
const discord = require("discord.js");
const client = new discord.Client();
const config = require("../config.json");
const prefix = config.prefix;
const Hypixel = require("hypixel-api-reborn");
const { strict } = require("assert");
const hypixel = new Hypixel.Client(config.hypixelapi);
const statusChannelID = "859214771454607380"
const statusChannel = client.channels.cache.get(statusChannelID)

module.exports = {
    call : call,
    bedwars : this.bedwars,
    skywars : this.skywars,
    now : this.now,
    status : this.status
}

function call(msg) {
const args = msg.content.split(" ");
const command = args[1];
const mcid = args[2];

switch (command) {
    case "bw" :
    case "bedwars" :
        bedwars(msg , mcid);
        break;
    case "sw" :
    case "skywars" :
        skywars(msg , mcid);
        break;
    case "status" :
        status(msg , mcid);
        break;
    case "now" :
        now(msg , mcid);
        break;
        
}
}


function now (msg , mcid) {
    hypixel.getStatus(mcid)
    .then(player =>{
        let pOnline = player.online;
        let pGame = player.game;
        let pMap = player.map;
        let pColor;
        let embed;
        if (pOnline == true) {
            pOnline = "オンライン" , 
            pColor = "#00ff00" , 
            embed = new discord.MessageEmbed()
                .setColor(pColor)
                .setTitle(`${mcid}様のステータス`)
                .setDescription("現在のステータスを表示します")
                .addFields({name : "オンライン状況" , value : `${pOnline}`} , 
                           {name : "プレイしているゲーム" , value : `${pGame}` , inline : true}, 
                           {name : "プレイしているマップ" , value : `${pMap}` , inline : true})
                .setTimestamp();
        } else {pOnline = "オフライン" , 
                pColor = "#ff0000" , 
                embed = new discord.MessageEmbed()
                      .setColor(pColor)
                      .setTitle(`${mcid}様のステータス`)
                      .setDescription("現在のステータスを表示します")
                      .addFields({name : "オンライン状況" , value : `${pOnline}`})
                      .setTimestamp();}
        msg.channel.send(embed)
    })
};


function bedwars (msg , mcid) {
    if(!msg.channel.id == statusChannel) return;
    
    hypixel.getPlayer(mcid)
    .then(player =>{
        let bw = player.stats.bedwars;
        let bwLevel = bw.level;
        let bwCoins = bw.coins;
        let bwIron = bw.collectedItemsTotal.iron;
        let bwGold = bw.collectedItemsTotal.gold;
        let bwDiamond = bw.collectedItemsTotal.diamond;
        let bwEmerald = bw.collectedItemsTotal.emerald;
        let bwPlayedGames = bw.playedGames;
        let bwFK = bw.finalKills;
        let bwFD = bw.finalDeaths;
        let bwFKDR = bw.finalKDRatio;
        let bwKill = bw.kills;
        let bwDeaths = bw.deaths;
        let bwKDR = bw.KDRatio;
        let bwBroken = bw.beds.broken;
        let bwlost = bw.beds.lost;
        let bwBBBLR = bw.beds.BLRatio;
        let bwWin = bw.wins;
        let bwLosses = bw.losses;
        let bwWLR = bw.WLRatio;
        let embed = new discord.MessageEmbed()
        .setColor("8b0000")
        .setTitle("ベッドウォーズステータス")
        .setDescription(`[${bwLevel}✫] ${mcid}`)
        .addFields({name : "ファイナルデス数" , value : `${bwFK}` , inline : true} ,
        {name : "ファイナルキル数" , value : `${bwFD}` , inline : true} ,
        {name : "ファイナルキルデス比" , value : `${bwFKDR}` , inline : true} ,
        {name : "キル数" , value : `${bwKill}` , inline : true} ,
        {name : "デス数" , value : `${bwDeaths}` , inline : true} ,
        {name : "キルデス比" , value : `${bwKDR}` , inline : true} ,
        {name : "ベッドを壊した回数" , value : `${bwBroken}` , inline : true} ,
        {name : "ベッドが壊された回数" , value : `${bwlost}` , inline : true} ,
        {name : "ベッドを壊した回数と壊した回数の比" , value : `${bwBBBLR}` , inline : true} ,
        {name : "勝利回数" , value : `${bwWin}` , inline : true} ,
        {name : "敗北回数" , value : `${bwLosses}` , inline : true} ,
        {name : "勝敗比" , value : `${bwWLR}` , inline : true} ,
        {name : "コイン数" , value : `${bwCoins}` , inline : true} ,
        {name : "今までゲットした鉄の数" , value : `${bwIron}` , inline : true} ,
        {name : "今までゲットした金の数" , value : `${bwGold}` , inline : true} ,
        {name : "今までゲットしたダイアの数" , value : `${bwDiamond}` , inline : true} ,
        {name : "今までゲットしたエメラルドの数" , value : `${bwEmerald}` , inline : true} ,
        {name : "今まで遊んだ回数" , value : `${bwPlayedGames}` , inline : true}
        );
        msg.channel.send(embed)
    })
}

function skywars (msg , mcid) {
    hypixel.getPlayer(mcid)
    .then(player =>{
        let sw = player.stats.skywars;
        let swLevel = sw.level;
        let swCoins = sw.coins;
        let swHeads = sw.heads;
        let swOpals = sw.opals;
        let swExperience = sw.experience;
        let swShards =sw.shards;
        let swSouls = sw.souls;
        let swKills = sw.kills;
        let swDeaths = sw.deaths;
        let swKDR = sw.KDRatio;
        let swWins = sw.wins;
        let swLosses = sw.losses;
        let swWLR = sw.WLRatio;
        let swPlayedGames = sw.playedGames;

        let embed = new discord.MessageEmbed()
        .setColor("00ffff")
        .setTitle("スカイウォーズステータス")
        .setDescription(`[${swLevel}✫] ${mcid}`)
        .addFields({name : "キル数" , value : `${swKills}` , inline : true} ,
        {name : "デス数" , value : `${swDeaths}` , inline : true} ,
        {name : "キルデス比" , value : `${swKDR}` , inline : true} ,
        {name : "勝利数" , value : `${swWins}` , inline : true} ,
        {name : "敗北数" , value : `${swLosses}` , inline : true} ,
        {name : "勝敗比" , value : `${swWLR}` , inline : true} ,
        {name : "今まで遊んだ回数" , value : `${swPlayedGames}` , inline : true} ,
        {name : "コイン数" , value : `${swCoins}` , inline : true} ,
        {name : "ヘッド数" , value : `${swHeads}` , inline : true} ,
        {name : "オパール数" , value : `${swOpals}` , inline : true} ,
        {name : "経験値数" , value : `${swExperience}` , inline : true} ,
        {name : "シャード数" , value : `${swShards}` , inline : true} ,
        {name : "ソウル数" , value : `${swSouls}` , inline : true} );

        msg.channel.send(embed);
    })
};


function status (msg , mcid) {
    hypixel.getPlayer(mcid)
    .then(player =>{
        let st = player;
        let stLevel = st.level;
        let stLevelfloor = Math.floor(stLevel)
        let stRank = st.rank;
        let stFL = st.firstLogin.toLocaleString();
        let stLLI = st.lastLogin.toLocaleString();
        let stLLO = st.lastLogout.toLocaleString();
        let stAP = st.achievementPoints;
        let stkarma = st.karma;
        let stRPG = st.recentlyPlayedGame;
        let stUL = st.userLanguage;
        let stRPT = st.ranksPurchaseTime;
        let stRPTVip = stRPT.VIP.toLocaleString();
        let stRPTVipPlus = stRPT.VIP_PLUS.toLocaleString();
        let stRPTMvp = stRPT.MVP;
        let stRPTMvpPlus = stRPT.MVP_PLUS.toLocaleString();
        let stColor;
        switch(stRank) {
            case "Admin" :
                stColor = "#ff0000";
                break;
            case "Helper" :
                    stColor = "#0000ff";
                break;    
            case "Moderator" :
                stColor = "#000080";
                break;
            case "YouTube" :
                stColor = "#800000";
                break;
            case "MVP++" :
                stColor = "#00ffff";
                break;
            case "MVP" :
                stColor = "#00ffff";
                break;
            case "MVP+" :
                stColor = "#40e0d0";
                break;
            case "VIP" :
                stColor = "#00ff00";
                break;
            case "VIP+" :
                stColor = "#32cd32";
                break;
            case "Default" :
                stColor = "#808080";
        };

        
        let embed = new discord.MessageEmbed()
        .setTitle(`${mcid}様のステータス`)
        .setColor(stColor)
        .setDescription(`[${stLevelfloor}✫] ${mcid}`)
        .addFields({name : "Hypixelレベル" , value : `${stLevelfloor}` , inline : true} ,
        {name : "ランク" , value : `${stRank}` , inline : true} ,
        {name : "初めてログインした時間" , value : `${stFL}` , inline : true} ,
        {name : "最後にログインした時間" , value : `${stLLI}` , inline : true} ,
        {name : "最後にログアウトした時間" , value : `${stLLO}` , inline : true} ,
        {name : "実績ポイント" , value : `${stAP}` , inline : true} ,
        {name : "カルマ" , value : `${stkarma}` , inline : true} ,
        {name : "最後に遊んだゲーム" , value : `${stRPG}` , inline : true} ,
        {name : "使ってる言語" , value : `${stUL}` , inline : true} ,
        {name : "VIPを購入した日" , value : `${stRPTVip}` , inline : true} ,
        {name : "VIP+を購入した日" , value : `${stRPTVipPlus}` , inline : true} ,
        {name : "MVPを購入した日" , value : `${stRPTMvp}` , inline : true} ,
        {name : "MVP+を購入した日" , value : `${stRPTMvpPlus}` , inline : true} ,
        )

        msg.channel.send(embed);
    })
};
