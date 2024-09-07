/** @format */

let messageHistory = new Map();
const stringSimilarity = require('string-similarity');

const { PermissionsBitField } = require('discord.js');
module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (!message.content || message.author.bot || !message.guild) return;

    let as = await client.db.get(`antispam_${message.guild.id}`) ? await client.db.get(`antispam_${message.guild.id}`) : null
    
    if (as === false || as === null) return;

    if (as === true) {
  
    let wl = await client.db.get(`wlAm_${message.guild.id}`) ?  await client.db.get(`wlAm_${message.guild.id}`) : []
    
    if (
      message.author.id === message.guild.ownerId || 
      message.member.permissions.has(PermissionsBitField.resolve('Administrator')) || 
      message.member.permissions.has(PermissionsBitField.resolve('ManageMessages')) || 
      (wl.includes(message.author.id))
    )
      return;

    let logch = await client.db.get(`amLogs_${message.guild.id}`)

    let ch = await message.guild.channels.fetch(logch)

    if (message.mentions.everyone || message.mentions.here) {
      await message.delete()
      await message.member.timeout(900000).then(() => {
          message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Muted ${message.author.tag} for attempting \`@everyone / @here\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
        
        ch.send({embeds: [new client.emb().desc(`**${client.emoji.warn} Member Muted**\n**Member**: ${message.author.tag}\n**Member Id**: ${message.author.id}\n\n**Reason**: Attempted \`@everyone / @here\``).setAuthor({name: `Automod Action`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `CodeX Automod`, iconURL: client.user.displayAvatarURL()}).setTimestamp()]}).catch(() => { })
        
        }).catch((err) => {
        message.channel.send({embeds: [new client.emb().desc(`*Could not timeout ${message.author}*\n${err}`)]});
        })

          
    }


    

    if (!messageHistory.has(message.author.id)) {
      let data = {
        content: message.content,
        timestamp: message.createdTimestamp,
      };
      messageHistory.set(message.author.id, [data]);
    } else {
      
      const history = messageHistory.get(message.author.id);
      let data = {
        content: message.content,
        timestamp: message.createdTimestamp,
      };
      
      history.push(data);
      messageHistory.set(message.author.id, history);
    }

    

    let history = messageHistory.get(message.author.id);

    let recentMessages = history.filter(
      (data) => Date.now() - data.timestamp < 5000,
    );

    let recentMessages2 = history.filter(
      (data) => Date.now() - data.timestamp < 7000,
    );

    let x = 0;
    if (recentMessages2.length > 1) {
      for (let i = 0; i < recentMessages2.length - 1; i++) {
        let s1 = recentMessages[i]?.content;
        let s2 = recentMessages[i + 1]?.content;
        try {
          res = await stringSimilarity.compareTwoStrings(s1, s2);
          x = x + res;
        } catch (err) {}
      }
    }

    let similarity = (x / (recentMessages2.length - 1)) * 100;

    if (recentMessages2.length > 3 && similarity > 70) {
      let x = await message.member.timeout(900000)
        .then(() => {
          message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Muted ${message.author.tag} for spamming`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]});
          ch.send({embeds: [new client.emb().desc(`**${client.emoji.warn} Member Muted**\n**Member**: ${message.author.tag}\n**Member Id**: ${message.author.id}\n\n**Reason**: Spamming`).setAuthor({name: `Automod Action`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `CodeX Automod`, iconURL: client.user.displayAvatarURL()}).setTimestamp()]})
          
        }).catch((err) => {
          message.channel.send({embeds: [new client.emb().desc(`*Could not timeout ${message.author}*\n${err}`)]});
        });

      

      messageHistory.delete(message.author.id);

      messages = await message.channel.messages.fetch({ limit: 20 });
      userMessages = messages.filter(
        (msg) => msg.author.id === message.author.id,
      );
      message.channel.bulkDelete(userMessages, true).catch((err) => {});
    }

    if (recentMessages.length > 5) {
      await message.member.timeout(900000)
        .then(() => {
          message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Muted ${message.author.tag} for spamming`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
          ch.send({embeds: [new client.emb().desc(`**${client.emoji.warn} Member Muted**\n**Member**: ${message.author.tag}\n**Member Id**: ${message.author.id}\n\n**Reason**: Spamming`).setAuthor({name: `Automod Action`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `CodeX Automod`, iconURL: client.user.displayAvatarURL()}).setTimestamp()]})
          
        }).catch((err) => {
          message.channel.send({embeds: [new client.emb().desc(`*Could not timeout ${message.author}*\n${err}`)]});
        });


      messageHistory.delete(message.author.id);

      messages = await message.channel.messages.fetch({ limit: 20 });
      userMessages = messages.filter(
        (msg) => msg.author.id === message.author.id,
      );
      message.channel.bulkDelete(userMessages, true).catch((err) => {});
    }
    }
  });
};