const { ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'media',
  category: 'media',
  aliases: ["piconly"],
  description: 'Setup channels to be used only for sending media',
  args: true,
  usage: 'media <setup/remove> [channel]',
  userPerms: ['Administrator'],
  botPerms: ['ManageGuild'],
  aboveme: true,
  owner: false,
  execute: async (client, message, args, prefix) => {

    let sub = args[0] 

    let media = await client.db.get(`media_${message.guild.id}`) ? await client.db.get(`media_${message.guild.id}`) : []

    if (sub === `setup` || sub === `set`) {

      let ch = message.mentions.channels.first()?.id ||
      args[0]?.replace(/[^0-9]/g, '')
      

        if (!ch) {

          return message.reply(`You didn't mention a channel`)        
        }

      if (media.includes(ch)) {
        return message.channel.send(`Mentioned channel is already in media channels`)
      }

      if (media.length > 1) {
        return message.channel.send(`You can't add more than 2 channels`)
      }

      media.push(ch)
      await client.db.set(`media_${message.guild.id}`, media)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Added <#${ch}> to media only channels`)]})
      
    } else {
      if (sub === `remove`) {

       let ch = message.mentions.channels.first()?.id ||
      args[0]?.replace(/[^0-9]/g, '')
      

        if (!ch) {

          return message.reply(`You didn't mention a channel`)        
        }

      if (!media.includes(ch)) {
        return message.channel.send(`Mentioned channel is not in media channels`)
      }

        media = media.filter((m) => m !== ch)
        await client.db.set(`media_${message.guild.id}`, media)

      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Removed <#${ch}> from media only channels`)]})
        
      } else {
        if (sub == `show` || sub === `config`) {
          let channels = ""

          for(i=0; i< media.length; i++){
let ch = await message.guild.channels.fetch(media[i])
channels += `\`[${i+1}]\`  -  ${ch}\n`
          }

          return message.channel.send({embeds: [new client.emb().setAuthor({name:`Media Only Channels`, iconURL: message.guild.iconURL({dynamic: true})}).setFooter({text: `Requested By `+ message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).addFields([{name: `Setupped Channels`, value: channels.length > 0 ? channels : `None`}])]})
          
        } else {
          return message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}media\``, value: `\`${prefix}media setup \`\nAdd channels to media only\n\n\`${prefix}media remove\`\nRemove channels from media only\n\n\`${prefix}media show\`\nShows the current channels for media`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
            }
      }
    }
    
  }
}