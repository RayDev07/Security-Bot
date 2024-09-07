/** @format */

const { PermissionsBitField } = require('discord.js');
module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (!message.content || message.author.bot || !message.guild) return;

    let ai = client.db.get(`antiinv_${message.guild.id}`) ? client.db.get(`antiinv_${message.guild.id}`) : null
    
    if (ai === false || ai === null) return;

    if (ai === true) {
    
    let wl = await client.db.get(`wlAm_${message.guild.id}`) ?  await client.db.get(`wlAm_${message.guild.id}`) : []
    
    if (
      message.author.id === message.guild.ownerId || 
      message.member.permissions.has(PermissionsBitField.resolve('Administrator')) ||
      message.member.permissions.has(
        PermissionsBitField.resolve('ManageMessages'),
      ) ||
      message.member.permissions.has(
        PermissionsBitField.resolve('EmbedLinks'),
      ) || 
      (wl.includes(message.author.id))
    )
      return;

    let logch = await client.db.get(`amLogs_${message.guild.id}`)

    let ch = await message.guild.channels.fetch(logch)

      if (
      /(?:dis.gd?:\/\/)?discord(?:app)?\.(?:com\/invite|gg)\/[a-zA-Z0-9]+\/?/gi.test(
        message.content,
      ) === true
    ) {
      await message.delete().catch(() => {});
      await message.member
        .timeout(900000)
        .then(() => {
          message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Muted ${message.author.tag} for advertising`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})

          ch.send({embeds: [new client.emb().desc(`**${client.emoji.warn} Member Muted**\n**Member**: ${message.author.tag}\n**Member Id**: ${message.author.id}\n\n**Reason**: Advertising`).setAuthor({name: `Automod Action`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `CodeX Automod`, iconURL: client.user.displayAvatarURL()}).setTimestamp()]}).catch(() => { });
          
        }).catch((err) => {
        message.channel.send({embeds: [new client.emb().desc(`*Could not timeout ${message.author}*\n${err}`)]});
        });
            
        
      }

    }
  })
}