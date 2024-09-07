const { PermissionsBitField } = require('discord.js');

module.exports = (client) => {
  
  client.on('messageCreate', async (message) => {

   let media = await client.db.get(`media_${message.guild.id}`) ? await client.db.get(`media_${message.guild.id}`) : []

    if (!media || media === null) return;

    
    if (message.author.bot || !message.guild) return;

    if (media.includes(message.channel.id)) {
      
    
        if (
      message.author.id === message.guild.ownerId || 
      message.member.permissions.has(PermissionsBitField.resolve('Administrator')) 
     )  
      return;

      if (message.attachments.size === 0) {
        await message.delete()
        message.channel.send({embeds: [new client.emb().desc(`${client.emoji.warn} **This channel is configured only for media content**\n*Please refrain from chatting here*`)]}).then((m) => setTimeout(() => m.delete(), 3000))
      .catch((e) => {})
      }
    

    
    } else {
      return;
    }
    
  })
}