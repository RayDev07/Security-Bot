/** @format */

const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'snipe',
  aliases: [],
  category: 'utility',
  description: 'snipes last edited/deleted message',
  args: false,
  usage: 'snipe [channel]',
  userPerms: ['ManageMessages'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    const channel = message.mentions.channels.first() || message.channel;

    
    if (!client.snipes.has(channel.id)) {
      let e = new client.emb().desc(
         
          `${client.emoji.warn}**:** There are no deleted/edited messages in ${channel}`,
      );
      return message.channel.send({ embeds: [e] });
    }
    const snipe = await client.snipes.get(channel.id);

    if (!snipe) {
      let e = new client.emb().desc(
        
          `**${client.emoji.warn}:** There are no deleted/edited messages in ${channel}`,
      );
      return message.channel.send({ embeds: [e] });
    }
    const { content, author, createdAt, deletedAt, updatedAt, type } = snipe;

    if (type === 'edit') {
      let e = new client.emb()
        .setAuthor({name: author.username, iconURL: author.displayAvatarURL()})
        .desc(`${content}`)
        .setFooter({text: `Edited`, iconURL: message.guild.iconURL({dynamic: true}) })
        .thumb('https://cdn-icons-png.flaticon.com/512/1782/1782750.png')
      .setTimestamp(updatedAt)
      return message.channel.send({ embeds: [e] });
    }

    if (type === 'delete') {
      let e = new client.emb()
        .setAuthor({name: author.username, iconURL: author.displayAvatarURL()})
        .desc(`${content}`)
        .setFooter({text: `Deleted`, iconURL: message.guild.iconURL({dynamic: true}) })
        .thumb('https://cdn-icons-png.flaticon.com/512/4803/4803717.png')
      .setTimestamp(deletedAt)
     
      return message.channel.send({ embeds: [e] });
    }
  },
};