const db = require("../../assets/afk.js");
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');
const moment = require('moment');

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {

if (message.author.bot || message.author.system || !message.guild) return;

    if (message.content.includes('afk') ) {
      return
    }

    let data = await db.findOne({ Guild: message.guildId, Member: message.author.id });
    if (data) {
      if (message.author.id === data.Member) {
        const timestamp = ms(data.Time)
        const time = moment(timestamp).fromNow();
        await data.deleteOne({ Guild: message.guildId, Member: message.author.id })
        return message.reply({embeds: [new client.emb().desc(`Welcome back! I removed your afk. You were afk since \`${time}\``)]})
      }
    }
    const memberMentioned = message.mentions.users.first();
    
    if (memberMentioned) {
      data = await db.findOne({ Guild: message.guildId, Member: memberMentioned.id });
      if (data) {
        message.reply(`${memberMentioned.tag} is afk since <t:${Math.round(data.Time/1000)}:R> for reason- ${data.Reason}`);
         memberMentioned.send({embeds: [new EmbedBuilder().setColor(client.color).setTitle(`You were mentioned in ${message.guild} by ${message.author.tag}`).setDescription(`[Jump Url](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`).addFields([
          {
            name: `Content:`,
            value: `${message.content ? message.content : `None`}`
          }
        ])]}).catch(()=>{})
      } else {
         return
      }
          }


  })
                                 }