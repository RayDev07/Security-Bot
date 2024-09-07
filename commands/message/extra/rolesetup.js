/** @format */
const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'rolesetup',
  aliases: ['setuprole'],
  category: 'Extra',
  description: 'Setup customroles',
  args: true,
  usage: 'rolesetup <alias> <role>',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {

    let type = args[0]

    if (!type) {
      return message.channel.send(`Command Usage: \`${prefix}rolesetup <alias> <role>\``)
    }

    if (type === `reset` || type === `clear`) {

      let m = await message.channel.send(`Deleting all custom role setup. . .`)

      await client.db.delete(`reqrole_${message.guild.id}`)
      await client.db.delete(`owner_${message.guild.id}`)
      await client.db.delete(`founder_${message.guild.id}`)
      await client.db.delete(`admin_${message.guild.id}`)
      await client.db.delete(`manager_${message.guild.id}`)
      await client.db.delete(`mod_${message.guild.id}`)
      await client.db.delete(`staff_${message.guild.id}`)
      await client.db.delete(`bot_${message.guild.id}`)
      await client.db.delete(`vip_${message.guild.id}`)
      await client.db.delete(`guest_${message.guild.id}`)
      await client.db.delete(`partner_${message.guild.id}`)
      await client.db.delete(`artist_${message.guild.id}`)
      await client.db.delete(`friend_${message.guild.id}`)
      await client.db.delete(`qt_${message.guild.id}`)
      
      return m.edit(`${client.emoji.tick} Deleted all custom role setup`)
      
    }


    if (type === 'config' || type === 'show') {

      let e = new client.emb().desc(
      `${client.emoji.loading} Fetching details please wait . . .`,
    );
    let msg = await message.channel.send({ embeds: [e] });


      let req = await client.db.get(`reqrole_${message.guild.id}`) 
      
      let owner = await client.db.get(`owner_${message.guild.id}`) 
      
      let founder = await client.db.get(`founder_${message.guild.id}`) 

      let admin = await client.db.get(`admin_${message.guild.id}`) 

      let manager = await client.db.get(`manager_${message.guild.id}`)

      let mod = await client.db.get(`mod_${message.guild.id}`) 

      let staff = await client.db.get(`staff_${message.guild.id}`) 

      let bot = await client.db.get(`bot_${message.guild.id}`) 
        
      let vip = await client.db.get(`vip_${message.guild.id}`)

      let partner = await client.db.get(`partner_${message.guild.id}`) 
      
      let artist = await client.db.get(`artist_${message.guild.id}`) 

      let guest = await client.db.get(`guest_${message.guild.id}`) 

      let friend = await client.db.get(`friend_${message.guild.id}`)

      let qt = await client.db.get(`qt_${message.guild.id}`)

      let a = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
      .setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setTitle('Custom Role Setup Config')
      .setDescription(`**Required Role** : ${req ? `<@&${req}>` : "Role Isn't Set"}\n**Server Owner Role** : ${owner ? `<@&${owner}>` : "Role Isn't Set"}\n**Server Founder Role** : ${founder ? `<@&${founder}>` : "Role Isn't Set"}\n**Server Admin Role** : ${admin ? `<@&${admin}>` : "Role Isn't Set"}\n**Server Manager Role** : ${manager ? `<@&${manager}>` : "Role Isn't Set"}\n**Server Mod Role** : ${mod ? `<@&${mod}>` : "Role Isn't Set"}\n**Server Staff Role** : ${staff ? `<@&${staff}>` : "Role Isn't Set"}\n**Bots Role** : ${bot ? `<@&${bot}>` : "Role Isn't Set"}\n**Vip Role** : ${vip ? `<@&${vip}>` : "Role Isn't Set"}\n**Guest Role** : ${guest ? `<@&${guest}>` : "Role Isn't Set"}\n**Partner Role** : ${partner ? `<@&${partner}>` : "Role Isn't Set"}\n**Artist Role** : ${artist ? `<@&${artist}>` : "Role Isn't Set"}\n**Friends Role** : ${friend ? `<@&${friend}>` : "Role Isn't Set"}\n**Cuties Role** : ${qt ? `<@&${qt}>` : "Role Isn't Set"}`)
      


    return msg.edit({embeds: [a]})
      


      

    }


    


    let role = message.mentions.roles.first()?.id || args[1]?.replace(/[^0-9]/g, '');

      let roml = await message.guild.roles.cache.get(role)
    
    if (!roml) return client.emit(`invalidRole`, message)

        if (roml.managed === true) {
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use integrated roles`)]})
      }
      if(roml.permissions.has('Administrator')){
       return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use roles with **Admin Permissions**`)]})
      } 

    let types = ['owner', 'founder', 'manager', 'admin', 'friend', 'artist', 'girl', 'guest', 'staff', 'vip', 'mod', 'bots', 'partner']

        if (type === `partners` || type === `partner` || type === `prtner`) {
   client.db.set(`partner_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Partner role to <@&${role}>`)]})    
         }         

        if (type === `required` || type === `reqrole` || type === `requiredrole`) {

      client.db.set(`reqrole_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Required role to <@&${role}>`)]})    
         }         


    if (type === `mod` || type === `moderator` || type === `moderation`) {

      client.db.set(`mod_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Mod role to <@&${role}>`)]})    
    }



    if (type === `bots` || type === `robot` || type === `bot`) {

      let data = await client.db.get(`bot_${message.guild.id}`)

      client.db.set(`bot_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Bots role to <@&${role}>`)]})    
  }



    if (type === `staff` || type === `officials` || type === `official` || type === `worker`) {

      client.db.set(`staff_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Staff role to <@&${role}>`)]})    
    }


    if (type === `vip` || type === `premium` || type === `vvip`) {

      client.db.set(`vip_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Vip role to <@&${role}>`)]})    
    }


    if (type === `guest` || type === `guests`) {

      client.db.set(`guest_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Guest role to <@&${role}>`)]})    
    }



    if (type === `girl` || type === `qt` || type === `cutie` || type === `girls` || type === `cuties` || type === `ladki`) {

      client.db.set(`qt_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Girl role to <@&${role}>`)]})    
    }


    if (type === `artists` || type === `artist` || type === `kalakar`) {

    client.db.set(`artist_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Artist role to <@&${role}>`)]})    
    }


    if (type === `admins` || type === `administrator` || type === `admin`) {

      client.db.set(`admin_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Admin role to <@&${role}>`)]})    
    }
    


    if (type === `friend` || type === `friends` || type === `bhai` || type === `dost` || type === `specials`) {

      client.db.set(`friend_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Friend role to <@&${role}>`)]})    
    }


    if (type === `manager` || type === `management` || type === `managers`) {

      client.db.set(`manager_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Manager role to <@&${role}>`)]})    
    }


    if (type === `owner` || type === `own` || type === `king` || type === `owners`) {
      client.db.set(`owner_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Owner role to <@&${role}>`)]})    
    }


    if (type === `founder` || type === `founders` || type === `mainowner`) {
      client.db.set(`founder_${message.guild.id}`, roml.id)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Founder role to <@&${role}>`)]})    
    }
    

    
      

  }
}