/** @format */

const { ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'vcrole',
  category: 'welcomer',
  aliases: ["vcroles", "vrole"],
  description: 'Add/Remove roles to be given/taken from members upon joining vc',
  args: true,
  usage: 'vcrole <humans/bots/show/reset> [add/remove] [role]',
  userPerms: ['Administrator'],
  botPerms: ['ManageGuild'],
  aboveme: true,
  owner: false,
  execute: async (client, message, args, prefix) => {

    let vrh = await client.db.get(`vrh_${message.guild.id}`) ? await client.db.get(`vrh_${message.guild.id}`) : []

    let vrb = await client.db.get(`vrb_${message.guild.id}`) ? await client.db.get(`vrb_${message.guild.id}`) : []


    let ar = args[0]


    if (ar === `humans` || ar === `human`) {

      let type = args[1]

      if (type === `add` || type === `+`) {

        let rid = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '')

    let role = rid
      ? await message.guild.roles.fetch(rid, { force: true }).catch((err) => {})
      : null

      if (!role || !rid) {
        return client.emit(`invalidRole`, message)
      }
        
        if (role.managed === true) {
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use integrated roles`)]})
        }

        if(role.permissions.has('Administrator')){
       return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use roles with **Admin Permissions**`)]})
        }

        if (vrh.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: ${role} is already in Human Vcroles`)]})
        }

        if (vrh.length > 4) {

          return message.channel.send(`You can't add more than 5 roles!`)
          
        }

      await vrh.push(role.id)
        await client.db.set(`vrh_${message.guild.id}`, vrh)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Added** ${role.name} to Human Vcroles`)]})     
        
      } else {
              if (type === `remove` || type === `-`) {

        let rid = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '')

    let role = rid
      ? await message.guild.roles.fetch(rid, { force: true }).catch((err) => {})
      : null

      if (!role || !rid) {
        return client.emit(`invalidRole`, message)
      }

       if (!vrh.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: ${role} is not in Human Vcroles`)]})
        }


      vrh = vrh.filter((r) => r !== role.id)
        await client.db.set(`vrh_${message.guild.id}`, vrh)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Removed** ${role.name} from Human Vcroles`)]})

                
       } else {

            return message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}vcrole humans\``, value: `\`${prefix}vcrole humans add\`\nAdd roles to human vcroles\n\n\`${prefix}vcrole humans remove\`\nRemove roles from human vcroles`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
     
        }
      }     
    } else {

      if (ar === `bots` || ar === `bot`) {

              let type = args[1]

      if (type === `add` || type === `+`) {

        let rid = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '')

    let role = rid
      ? await message.guild.roles.fetch(rid, { force: true }).catch((err) => {})
      : null

      if (!role || !rid) {
        return client.emit(`invalidRole`, message)
      }
        
        if (role.managed === true) {
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use integrated roles`)]})
        }

        if(role.permissions.has('Administrator')){
       return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You can't use roles with **Admin Permissions**`)]})
        }

        if (vrb.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: ${role} is already in Bot Autoroles`)]})
        }

        if (vrb.length > 2) {

          return message.channel.send(`You can't add more than 3 roles!`)
          
        }

      await vrb.push(role.id)
        await client.db.set(`vrb_${message.guild.id}`, vrb)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Added** ${role.name} to Bot Vcroles`)]})     
        
      } else {
        if (type === `remove` || type === `-`) {

        let rid = message.mentions.roles.first()?.id || args[2]?.replace(/[^0-9]/g, '')

    let role = rid
      ? await message.guild.roles.fetch(rid, { force: true }).catch((err) => {})
      : null

      if (!role || !rid) {
        return client.emit(`invalidRole`, message)
      }

       if (!vrb.includes(role.id)) {
          return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: ${role} is not in Bot Vcroles`)]})
        }


      vrb = vrb.filter((r) => r !== role.id)
        await client.db.set(`vrb_${message.guild.id}`, vrb)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Removed** ${role.name} from Bot Vcroles`)]})
      } else {
          return message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}vcrole bots\``, value: `\`${prefix}vcrole bots add\`\nAdd roles to bot vcroles\n\n\`${prefix}vcrole bots remove\`\nRemove roles from bot vcroles`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
     
      }
     }         
    } else {
        if (ar === `show` || ar === `config`) {

          let insaan = ""
          let majdoor = ""

          for(i=0; i< vrh.length; i++){
let role = await message.guild.roles.fetch(vrh[i])
insaan += `\`[${i+1}]\`  -  ${role}\n`
    }

          for(i=0; i< vrb.length; i++){
let role = await message.guild.roles.fetch(vrb[i])
majdoor += `\`[${i+1}]\`  -  ${role}\n`
          }


          return message.channel.send({embeds: [new client.emb().setAuthor({name:`CodeX Vcroles`, iconURL: message.guild.iconURL({dynamic: true})}).setFooter({text: `Requested By `+ message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).addFields([{name: `Human Vcroles`, value: insaan.length > 0 ? insaan : `None`}, {name: `Bot Vcroles`, value: majdoor.length > 0 ? majdoor : `None`}])]})
          
        } else {

          if (ar === `reset` || ar === `clear`) {

        vrh = new client.button().secondary(`vrh`, `Clear Humans`)
        vrb = new client.button().secondary(`vrb`, `Clear Bots`)
        vrall = new client.button().danger(`vrall`, `Clear All`)

          let vrr = await message.channel.send({embeds: [new client.emb().desc(`${client.emoji.ham} Select the vcrole module you would like to **Clear**`)], components: [new ActionRowBuilder().addComponents(vrh, vrb, vrall)]})


        const collector = await vrr.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} This menu can't be controlled by you`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });

      collector.on('collect', async(interaction) => {

    if (interaction.isButton()) {

            if (interaction.customId === `vrh`) {

              await client.db.delete(`vrh_${message.guild.id}`)
              return interaction.update({embeds: [new client.emb().desc(client.emoji.tick + ` Cleared the Human Vcroles setup`)], components: []})
              
              }
      if (interaction.customId === `vrb`) {

              await client.db.delete(`vrb_${message.guild.id}`)
              return interaction.update({embeds: [new client.emb().desc(client.emoji.tick + ` Cleared the Bot Vcroles setup`)], components: []})
              
              }
          if (interaction.customId === `vrall`) {

              await client.db.delete(`vrh_${message.guild.id}`)
          await client.db.delete(`vrb_${message.guild.id}`)
              return interaction.update({embeds: [new client.emb().desc(client.emoji.tick + ` Cleared all the Vcroles setup`)], components: []})
            
      }
                                          
    }
    })
        
            
          } else {

            return message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}vcrole\``, value: `\`${prefix}vcrole humans\`\nAdd/Remove roles from human vcroles\n\n\`${prefix}vcrole bots\`\nAdd/Remove roles from bot vcroles\n\n\`${prefix}vcrole show\`\nShows the current configurations for vcrole\n\n\`${prefix}vcrole reset\`\nReset the vcrole options`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
     
            
          }     
        }
    }
  }

      

  
            

    
 }
    }