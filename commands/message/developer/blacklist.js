/** format */

module.exports = {
  name: 'blacklist',
  aliases: ['bl'],
  description: '',
  category: 'developer',
  args: true,
  usage: '',
  userPerms: [],
  botPerms: [],
  owner: true,

  execute: async (client, message, args, prefix) => {

    let type = args[0]



  if (type === `user`) {


    let blU = await client.db.get(`blUser_${client.user.id}`) ? await client.db.get(`blUser_${client.user.id}`) : [];
    
    let userId = message.mentions.members.first()?.user.id ||
      args[1]?.replace(/[^0-9]/g, '')
      
    let [user] = await Promise.all([
      userId ? client.users.fetch(userId, { force: true }).catch((err) => {}) : null
    ])

    if (!user) {
      client.emit(`invalidUser`, message)
    }

        if (!blU.includes(user.id)) {
      blU.push(user.id)
        await client.db.set(`blUser_${client.user.id}`, blU)
      return message.channel.send({embeds: [ new client.emb().desc(`**Added** \`${user.tag}\` to my list`).setAuthor({name: `Manage Blacklist`, iconURL: client.user.displayAvatarURL()})]})
    }
    
    
    if (blU.includes(user.id)) {
      blU = blU.filter(u => u != `${user.id}`)
      client.db.set(`blUser_${client.user.id}`, blU)
      return message.channel.send({embeds: [ new client.emb().desc(`**Removed** \`${user.tag}\` from my list`).setAuthor({name: `Manage Blacklist`, iconURL: client.user.displayAvatarURL()})]})
    }   
  }


    if (type === `server`) {

      let blS = await client.db.get(`blServer_${client.user.id}`) ? await client.db.get(`blServer_${client.user.id}`) : [];

      let serverId = args[1]?.replace(/[^0-9]/g, '')

      let [server] = await Promise.all([
      serverId ? client.guilds.fetch(serverId, { force: true }).catch((err) => {}) : null
    ])

      if (!server) {
        return message.reply({embeds: [ new client.emb().desc(`${client.emoji.cross} ${message.author}: You didn't provide a valid server`)]})
      }

          if (!blS.includes(server.id)) {
      blS.push(server.id)
        await client.db.set(`blServer_${client.user.id}`, blS)
      return message.channel.send({embeds: [ new client.emb().desc(`**Added** \`${server.name}\` to my list`).setAuthor({name: `Manage Blacklist`, iconURL: client.user.displayAvatarURL()})]})
    }
    
    
    if (blS.includes(args[1])) {
      blS = blS.filter(u => u != `${server.id}`)
      client.db.set(`blServer_${client.user.id}`, blS)
      return message.channel.send({embeds: [ new client.emb().desc(`**Removed** \`${server.name}\` from my list`).setAuthor({name: `Manage Blacklist`, iconURL: client.user.displayAvatarURL()})]})
    }
    

      
    }
    

  }
}