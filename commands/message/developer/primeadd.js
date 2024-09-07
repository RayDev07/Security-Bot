/** @format */

const ms = require('ms');

module.exports = {
  name: 'primeadd',
  aliases: ['prime+'],
  description: 'Add premium to a user',
  category: 'developer',
  args: true,
  usage: 'primeadd <user>',
  userPerms: [],
  botPerms: [],
  owner: true,

  execute: async (client, message, args, prefix) => {


    let id = message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '')
    
    let user = id
      ? await client.users.fetch(id, { force: true }).catch((err) => {})
      : null;


    if (!user) {
      return client.emit(`invalidUser`, message)
    }

    

    if (args[1] === `base`) {

       await client.db.set(`uprem_${message.author.id}`, {
      start: Date.now(),
      end: Date.now + ms('30d'),
      count: 1,
      servers: [],
      tier: `Basic`,
      np: false    
    })


   return message.channel.send({embeds: [new client.emb().title(`Manage Premium`).desc(`${client.emoji.prime} **Added Prime to ${user.username}**\n\n${client.emoji.arrow} **Tier:** \`Basic\`\n${client.emoji.arrow} **Server Count:** 1\n${client.emoji.arrow} **Expiry:** <t:${Math.round((ms('30d') + Date.now())/1000)}:f>`).setFooter({text: `CodeX Prime`, iconURL: client.user.displayAvatarURL()})]})
      
    }

    if (args[1] === `basenp`) {

       await client.db.set(`uprem_${message.author.id}`, {
      start: Date.now(),
      end: Date.now() + ms('30d'),
      count: 1,
      servers: [],
      tier: `Basic`,
      np: true    
    })

   return message.channel.send({embeds: [new client.emb().title(`Manage Premium`).desc(`${client.emoji.prime} **Added Prime to ${user.username}**\n\n${client.emoji.arrow} **Tier:** \`Basic\`\n${client.emoji.arrow} **Server Count:** 1\n${client.emoji.arrow} **Expiry:** <t:${Math.round((ms('30d') + Date.now())/1000)}:f>`).setFooter({text: `CodeX Prime`, iconURL: client.user.displayAvatarURL()})]})

    }
      

    let dur = args[1]
    let time = ms(dur)

    let count = parseInt(args[2])
    

    await client.db.set(`uprem_${message.author.id}`, {
      start: Date.now(),
      end: Date.now() + time,
      count: count,
      servers: [],
      tier: `Special`
    })


    message.channel.send({embeds: [new client.emb().title(`Manage Premium`).desc(`${client.emoji.prime} **Added Prime to ${user.username}**\n\n${client.emoji.arrow} **Tier:** \`Special\`\n${client.emoji.arrow} **Server Count:** ${count}\n${client.emoji.arrow} **Expiry:** <t:${Math.round((Date.now() + time)/1000)}:f>`).setFooter({text: `CodeX Prime`, iconURL: client.user.displayAvatarURL()})]})

  }
}