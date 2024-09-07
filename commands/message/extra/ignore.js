module.exports = {
  name: `ignore`,
  category: `extra`,
  description: `Ignore a channel or command for the bot`,
  usage: `ignore <channel/command>`,
  aliases: [],
  botPerms: [],
  userPerms: [`ManageGuild`],
  execute: async(client, message, args, prefix) => {

    let ig = await client.db.get(`ignore_${message.guild.id}`) ? await client.db.get(`ignore_${message.guild.id}`) : {channels: [], commands: []}

    let subcmd = args[0]?.toLowerCase()

    if (subcmd === `channel` || subcmd === `ch`) {
      let id =
      message.mentions.channels.first()?.id ||
      args[1]?.replace(/[^0-9]/g, '');

      let channel = id

      ? await message.guild.channels.fetch(id, { force: true }).catch((err) => {})

      : null
    
    if (!channel) {     
      return client.emit(`invalidChannel`, message)
    }

    if (ig.channels.includes(channel.id)) {
      ig.channels = ig.channels.filter((x) => x !== channel.id)
      await client.db.set(`ignore_${message.guild.id}`, ig)
      return message.reply({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully removed ${channel} from ignored channels`)]})
    } else {
      ig.channels.push(channel.id)
      await client.db.set(`ignore_${message.guild.id}`, ig)
      return message.reply({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully added ${channel} to ignored channels`)]})
    }     
  } else {
      if (subcmd === `command` || subcmd === `cmd`) {

        let cmd = args[1]?.toLowerCase()

        let cmnd = await client.commands.get(cmd) || client.aliases.get(cmd)

        if (!cmnd) {
          return message.reply({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: Please provide a valid command`)]})
        }

        if (ig.commands.includes(cmnd.name)) {
          ig.commands = ig.commands.filter((x) => x !== cmnd.name)
          await client.db.set(`ignore_${message.guild.id}`, ig)
          return message.reply({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully removed ${cmnd.name} from ignored commands`)]})
        } else {
          ig.commands.push(cmnd.name)
          await client.db.set(`ignore_${message.guild.id}`, ig)
          return message.reply({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Successfully added ${cmnd.name} to ignored commands`)]})
        }      
      } else {

        if (subcmd === `config` || subcmd === `show`) {

          let channels = ""
          let commands = ""

          for(i=0; i< ig.channels.length; i++){
let ch = await message.guild.channels.fetch(ig.channels[i])
channels += `\`[${i+1}]\`  -  ${ch}\n`
          }

          for(i=0; i< ig.commands.length; i++){
let cmd = await client.commands.get(ig.commands[i])
commands += `\`[${i+1}]\`  -  ${cmd.name}\n` 
          }

          return message.channel.send({embeds: [new client.emb().setAuthor({name:`Ignore Config`, iconURL: message.guild.iconURL({dynamic: true})}).setFooter({text: `Requested By `+ message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).addFields([{name: `Channels`, value: channels.length > 0 ? channels : `None`}, {name: `Commands`, value: commands.length > 0 ? commands : `None`}])]})
          
        } else {

        return message.channel.send({embeds: [new client.emb().addFields([{ name: `\`${prefix}ignore\``, value:`\`${prefix}ignore channel\`\nAdd/Remove a channel from the ignore list\n\n\`${prefix}ignore command\`\nAdd/Remove a command from the ignore list\n\n\`${prefix}ignore config\`\nCheck the currently ignored channels/commands`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
        
      }
     }
  }

    
  }
}