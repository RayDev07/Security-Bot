/** @format */

const { UserSelectMenuBuilder, ActionRowBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'antinuke',
  category: 'antinuke',
  aliases: ['an', 'security'],
  description: "Manage the guild antinuke settings",
  args: true,
  usage: 'antinuke [setup/enable/disable/log]',
  botPerms: [],
  owner: false,
  extraowner: true,

  execute: async (client, message, args, prefix) => {

    if(!args[0]) {
      message.channel.send({embeds: [new client.emb().addFields([{ name: `\`${prefix}antinuke\``, value:`\`${prefix}antinuke setup\`\nSetup the Server Security with CodeX Setup Wizard\n\n\`${prefix}antinuke enable\`\nForcefully enable security with default settings\n\n\`${prefix}antinuke disable\`\nDisable server security by CodeX\n\n\`${prefix}antinuke log <#channel>\`\nSet logging channel for antinuke`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
    }


    let set = await client.db.get(`setup_${message.guild.id}`) ? await client.db.get(`setup_${message.guild.id}`) : null

    if (!set || set === null) {
      await client.db.set(`setup_${message.guild.id}`, false)
    }



    let subcmd = args[0]

    if (subcmd === `enable` || subcmd === `on`) {
      
      if (set === true) {
        return message.channel.send(`Security is already enabled here.`)
      }

       client.db.set(`setup_${message.guild.id}`, true)
     client.db.set(`punish_${message.guild.id}`, `ban`)
     let ch = await message.guild.channels.create({
	name: 'CodeX-logs',
	type: ChannelType.GuildText,
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: [PermissionsBitField.Flags.ViewChannel],
		},
		{
      id: client.user.id,
			allow: [PermissionsBitField.Flags.ViewChannel],
		},
	],
});

      client.db.set(`anlog_${message.guild.id}`, `${ch.id}`)
      ch.send(`**This Channel Is Specifically Configured For CodeX's Antinuke Logs**`)
      return message.channel.send({embeds: [new client.emb().setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).title(`CodeX Security`).desc(`**${client.emoji.tick} The antinuke setup has been completed.**\n\n*Move my role above for the antinuke to work properly*\n\nLogging Channel: ${ch}\nPunishment: Ban`).setTimestamp().setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})]})
      
    }

    if (subcmd === `disable` || subcmd === `off`) {

      if (set === false || set === null) {
        return message.channel.send(`Security is not enabled here.`)
      }
      
      client.db.set(`setup_${message.guild.id}`, false)
       client.db.delete(`punish_${message.guild.id}`)
      let ch = await client.db.delete(`anlog_${message.guild.id}`)
      let logch = await message.guild.channels.cache.get(ch)
     // await logch.delete().catch(() => {})
          
      return message.channel.send({embeds: [new client.emb().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).desc(`**${client.emoji.tick} The antinuke setup has been cleared.**`).setTimestamp().setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})]})
      
    }

    if (subcmd === `log` || subcmd === `logging` || subcmd === `logs`) {

      if (set === false || set === null) {
        return message.channel.send(`Security is not enabled here.`)
        }

      let logch = message.mentions.channels.first()?.id || args[1]?.replace(/[^0-9]/g, '')

      if (!logch) {
        client.db.delete(`anlog_${message.guild.id}`)
        return message.channel.send(`${client.emoji.tick} Set the antinuke logging channel to- \`None\``)
      }

     await client.db.set(`anlog_${message.guild.id}`, logch)

      return message.channel.send(`${client.emoji.tick} Set the antinuke logging channel to- <#${logch}>`)

     
    }

    if (subcmd === `setup` || subcmd === `wizard`) {

      if (set === true) {

        let en = new client.button().success('enable', 'Enable', client.emoji.tick, true)
        let dis = new client.button().danger('disable', 'Disable', client.emoji.cross)

      let enabled = new ActionRowBuilder().addComponents(en, dis)
        return message.channel.send({embeds: [new client.emb().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).desc(`Use the menu below to configue the antinuke settings:`).setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}).setTimestamp()], components: [enabled]})
        
      } else {

        let ken = new client.button().success('enable', 'Enable', client.emoji.tick)
        let kdis = new client.button().danger('disable', 'Disable', client.emoji.cross, true)

      let disabled = new ActionRowBuilder().addComponents(ken, kdis)
        return message.channel.send({embeds: [new client.emb().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).desc(`Use the menu below to configue the antinuke settings:`).setFooter({text: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})}).setTimestamp()], components: [disabled]}) 

        
      }    
    }
  
    

/*const userSelect = new UserSelectMenuBuilder()
			.setCustomId('users')
			.setPlaceholder('Select multiple users.')
			.setMinValues(1)
			.setMaxValues(10);

		const row1 = new ActionRowBuilder()
			.addComponents(userSelect);

		await message.reply({
			content: 'Select users:',
			components: [row1],
		});*/


  }
}