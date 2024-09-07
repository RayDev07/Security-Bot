/** @format */

const { PermissionsBitField } = require('discord.js');
module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (!message.content || message.author.bot || !message.guild) return;

    let ac = client.db.get(`anticap_${message.guild.id}`) ? client.db.get(`anticap_${message.guild.id}`) : null
    
    if (ac === false || ac === null) return;


    if (ac === true) {

    
    
    let wl = await client.db.get(`wlAm_${message.guild.id}`) ?  await client.db.get(`wlAm_${message.guild.id}`) : []
    
    if (
      message.author.id === message.guild.ownerId || 
      message.member.permissions.has(PermissionsBitField.resolve('Administrator')) ||
      message.member.permissions.has(
        PermissionsBitField.resolve('ManageMessages'),
      )  || 
      (wl.includes(message.author.id))
    )
      return;

    let logch = await client.db.get(`amLogs_${message.guild.id}`)

    let ch = await message.guild.channels.fetch(logch).catch(() => { })

      capitalLetters = message.content.match(/[A-Z]/g);
    newLines = message.content.split('').filter((c) => c === '\n').length;
    caps = capitalLetters ? capitalLetters.length : 0;

    if (newLines >= 4 || caps >= 7) {
      await message.delete().catch(() => {});
      await message.member
        .timeout(900000)
        .then(() => {
      message.channel.send({
          embeds: [new client.emb().desc(`${client.emoji.tick} Muted ${message.author.tag} for using mass caps/lines`).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
          ch.send({embeds: [new client.emb().desc(`**${client.emoji.warn} Member Muted**\n**Member**: ${message.author.tag}\n**Member Id**: ${message.author.id}\n\n**Reason**: Mass Caps/Lines`).setAuthor({name: `Automod Action`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `CodeX Automod`, iconURL: client.user.displayAvatarURL()}).setTimestamp()]}).catch(() => { });
          
        }).catch(() => {});    
    
    
    }

    }


  })
}