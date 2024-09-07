/** @format */

module.exports = {
  name: 'bdg',
  aliases: ['bg'],
  description: 'Add/Remove badges from a user',
  category: 'developer',
  args: true,
  usage: 'bdg <add/remove> <user>',
  userPerms: [],
  botPerms: [],
  owner: true,

  execute: async (client, message, args, prefix) => {

let id = message.mentions.members.first()?.user.id ||
      args[1]?.replace(/[^0-9]/g, '')
    
    let user = id
      ? await client.users.fetch(id, { force: true }).catch((err) => {})
      : null;


    if (!user) {
      return client.emit(`invalidUser`, message)
    }

  let badges = await client.db.get(`bdg_${user.id}`) ? await client.db.get(`bdg_${user.id}`) : []
    

    
    if (args[0] == `add` || args[0] == `+`) {

      let bdg = args[2]

    if (bdg === `owner` || bdg === `own`) {
    
      badges.push("owner")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Owner badge to ${user.username}`)]})
      
    }
      
      if (bdg === `developer` || bdg === `dev`) {
      badges.push("dev")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Developer badge to ${user.username}`)]})
    } 
      
       if (bdg === `friend` || bdg === `frnd`) {
      badges.push("friend")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Friend badge to ${user.username}`)]}) 
    } 
      
         if (bdg === `partner` || bdg === `prtner`) {
      badges.push("partner")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Partner badge to ${user.username}`)]})
    } 
      
           if (bdg === `early` || bdg === `supporter`) {
      badges.push("earlysupp")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Early Supporter badge to ${user.username}`)]})
    } 
      
      if (bdg === `staff` || bdg === `team`) {
      badges.push("team")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Staff badge to ${user.username}`)]})
    } 
      
               if (bdg === `rich` || bdg === `contributor`) {
      badges.push("contribution")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Contributor badge to ${user.username}`)]})
    }
      
      if (bdg === `tester` || bdg === `beta`) {
      badges.push("beta")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Beta Tester badge to ${user.username}`)]})
      }                                
          if (bdg === `bug` || bdg === `hunter`) {
      badges.push("bug")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Added** Bug Hunter badge to ${user.username}`)]})
    }
      
  }


    if (args[0] === `remove` || args[0] === `-`) {

    let bdg = args[2]

    if (bdg === `owner` || bdg === `own`) {
    
     badges = badges.filter((b) => b !== "owner")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Owner badge from ${user.username}`)]})
      
        }

      if (bdg === `developer` || bdg === `dev`) {
      badges = badges.filter((b) => b !== "dev")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Developer badge from ${user.username}`)]})
    } 
      
       if (bdg === `friend` || bdg === `frnd`) {
      badges = badges.filter((b) => b !== "friend")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Friend badge from ${user.username}`)]}) 
    } 
      
         if (bdg === `partner` || bdg === `prtner`) {
      badges = badges.filter((b) => b !== "partner")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Partner badge from ${user.username}`)]})
    } 
      
           if (bdg === `early` || bdg === `supporter`) {
      badges = badges.filter((b) => b !== "earlysupp")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Early Supporter badge from ${user.username}`)]})
    } 
      
      if (bdg === `staff` || bdg === `team`) {
      badges = badges.filter((b) => b !== "team")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Staff badge from ${user.username}`)]})
    } 
      
               if (bdg === `rich` || bdg === `contributor`) {
      badges = badges.filter((b) => b !== "contribution")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Contributor badge from ${user.username}`)]})
    }
      
      if (bdg === `tester` || bdg === `beta`) {
      badges = badges.filter((b) => b !== "beta")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Beta Tester badge from ${user.username}`)]})
      }                                
          if (bdg === `bug` || bdg === `hunter`) {
      badges = badges.filter((b) => b !== "bug")
     await client.db.set(`bdg_${user.id}`, badges)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} **Removed** Bug Hunter badge from ${user.username}`)]})
        }


      
    }

          

    
      }
  }