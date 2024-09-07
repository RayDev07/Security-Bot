/** @format */
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js')


module.exports = (client) => {
  client.on('interactionCreate', async(interaction) => {

   const channel = interaction.channel;
    if (channel && channel.type != 0) return;

    
   /* let close = new client.button().danger(`close`, `Close`, client.emoji.cross)
    let reopen = new client.button().success(`reopen`, `Re Open`, client.emoji.greet)
    let deltik = new client.button().danger(`deltik`, `Delete`, client.emoji.delete)
    let trans = new client.button().success(`trans`, `Transcript`, client.emoji.reason)
    
    const simplydjs = require('simply-djs')

simplydjs.manageTicket(interaction, {
  strict: true,
  embed: {
    title: "Ticket Created",
    description: `Welcome ${interaction.member.user.username}! The support will reach you shortly`,
    footer: {text: `CodeX- Ticketing Without Clutter`, iconURL: interaction.member.user.displayAvatarURL({dynamic: true})},
    color: simplydjs.toRgb("#2f3136")
  },
  buttons: {
    close: close.toJSON(),
    reopen: reopen.toJSON(),
    delete: deltik.toJSON(),
    transcript: trans.toJSON()
  },
  ticketname: "ticket {username}",
  pingRoles: ["1146363343150522459"],
  category: "1103222441897115709",
  logChannelId: "1138128897171529768"
})*/

    let user = await client.users.cache.get(interaction.member.id)

    let guild = interaction.guild


    let skiplogdis = new client.button().success(`skiplogdis`, `Skip`, client.emoji.skip, true)
    let skiplog = new client.button().success(`skiplog`, `Skip`, client.emoji.skip)

    let nxtdis = new client.button().success(`nextdis`, `Next`, client.emoji.arrow, true)

    let nxtlog = new client.button().success(`nextlog`, `Next`, client.emoji.arrow)

let nxten = new client.button().success(`enablenxt`, `Next`, client.emoji.arrow)
    

    let skiplogs = new ActionRowBuilder().addComponents(skiplog, nxtdis)

    let enabledn = new ActionRowBuilder().addComponents(skiplogdis, nxten)
    
    let nextlogs = new ActionRowBuilder().addComponents(skiplogdis, nxtlog)

    
    
    let set = await client.db.get(`setup_${interaction.guild.id}`) ? await client.db.get(`setup_${interaction.guild.id}`) : null

    if (!set || set === null) {
      await client.db.set(`setup_${interaction.guild.id}`, false)
    }

    let dev = client.owners.includes(interaction.member.id) 

    if (interaction.isButton()) {      
        



  ////////////////////////////
      
      if (interaction.customId === `disable`) {

        if (user.id != interaction.guild.ownerId && !dev) {
          return interaction.reply({content: `Only the guild owner can use these commands.`, ephemeral: true})
        }

        client.db.set(`setup_${interaction.guild.id}`, false)
       client.db.delete(`punish_${interaction.guild.id}`)
      let ch = await client.db.delete(`anlog_${interaction.guild.id}`)

        return interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).desc(`**${client.emoji.tick} The antinuke setup has been cleared.**`).setTimestamp().setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})], components: []})
        
      }
      
      if (interaction.customId === `enable`) {

        if (user.id != interaction.guild.ownerId && !dev) {
          return interaction.reply({content: `Only the guild owner can use these commands.`, ephemeral: true})
        }

       client.db.set(`setup_${interaction.guild.id}`, true)
     client.db.set(`punish_${interaction.guild.id}`, `ban`)
     let ch = await interaction.guild.channels.create({
	name: 'CodeX-logs',
	type: ChannelType.GuildText,
	permissionOverwrites: [
		{
			id: interaction.guild.id,
			deny: [PermissionsBitField.Flags.ViewChannel],
		},
		{
      id: client.user.id,
			allow: [PermissionsBitField.Flags.ViewChannel],
		},
	],
});

      client.db.set(`anlog_${interaction.guild.id}`, `${ch.id}`)
      ch.send(`**This Channel Is Specifically Configured For CodeX's Antinuke Logs**`) 

     interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).title(`CodeX Security`).desc(`**${client.emoji.tick} The antinuke setup has been completed.**\n\n*Move my role above for the antinuke to work properly*\n\nLogging Channel: ${ch}\nPunishment: Ban`).setTimestamp().setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})], components: []})

    /*    interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).desc(`Server security has been enabled with:\n\n**${client.emoji.tick} • Anti Channel-Create\n${client.emoji.tick} • Anti Channel-Delete\n${client.emoji.tick} • Anti Role-Create\n${client.emoji.tick} • Anti Role-Delete\n${client.emoji.tick} • Anti Member Roles-Update\n${client.emoji.tick} • Anti Kick\n${client.emoji.tick} • Anti Ban\n${client.emoji.tick} • Anti Unban\n${client.emoji.tick} • Anti Bot-Add\n${client.emoji.tick} • Anti Server-Update\n${client.emoji.tick} • Anti Vanity-Update\n\n${client.emoji.tick} • Auto Recovery**`).setTimestamp().setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})})], components: [enabledn]})*/
        
      }

      if (interaction.customId === `enablenxt`) {

        if (user.id != interaction.guild.ownerId && !dev) {
          return interaction.reply({content: `Only the guild owner can use these commands.`, ephemeral: true})
        }


        let crt = new client.button().secondary(`crt`, `Create`, client.emoji.plus)
        let cstm = new client.button().secondary(`cstm`, `Custom`, client.emoji.stars)

        let logs = new ActionRowBuilder().addComponents(crt, cstm)
        

         interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).desc(`Do you want me to create a logs channel for you? or you wish to use a custom one?`).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setTimestamp()], components: [logs, skiplogs]})
             
      }    

       if (interaction.customId === `crt`) {

        if (user.id != interaction.guild.ownerId && !dev) {
          return interaction.reply({content: `Only the guild owner can use these commands.`, ephemeral: true})
        }

                 let crtdis = new client.button().secondary(`crt`, `Create`, client.emoji.plus, true)
        let cstmdis = new client.button().secondary(`cstm`, `Custom`, client.emoji.stars, true)

         let logsdn = new ActionRowBuilder().addComponents(crtdis, cstmdis)

              let ch = await interaction.guild.channels.create({
	name: 'CodeX-logs',
	type: ChannelType.GuildText,
	permissionOverwrites: [
		{
			id: interaction.guild.id,
			deny: [PermissionsBitField.Flags.ViewChannel],
		},
		{
      id: client.user.id,
			allow: [PermissionsBitField.Flags.ViewChannel],
		},
	],
});

        client.db.set(`anlog_${interaction.guild.id}`, `${ch.id}`)

       interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).desc(`Logs Channel Created: <#${ch.id}>\n\n**You will need to select a punishment type in the next step**`).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setTimestamp()], components: [logsdn, nextlogs]})            

       }



      if (interaction.customId === `cstm`) {

        if (user.id != interaction.guild.ownerId && !dev) {
          return interaction.reply({content: `Only the guild owner can use these commands.`, ephemeral: true})
        }

        	const cstmch = new ModalBuilder()
			.setCustomId('cstmch')
			.setTitle('Logging Channel');

		// Add components to modal

		// Create the text input components
		const channelid = new TextInputBuilder()
			.setCustomId('chid')
			.setLabel("Enter The Channel Id For Antinuke Logging")		
      .setStyle(TextInputStyle.Short)
        .setMinLength(6)
        .setMaxLength(20)
        .setPlaceholder('1234567890')
        .setRequired(true)

        const row = new ActionRowBuilder().addComponents(channelid)

        cstmch.addComponents(row)

        await interaction.showModal(cstmch)      

      }
         

      
    }


	if (interaction.isModalSubmit()) {
	if (interaction.customId === 'cstmch') {

    let crtdis = new client.button().secondary(`crt`, `Create`, client.emoji.plus, true)
        let cstmdis = new client.button().secondary(`cstm`, `Custom`, client.emoji.stars, true)

         let logsdn = new ActionRowBuilder().addComponents(crtdis, cstmdis)

    const ch = interaction.fields.getTextInputValue('chid')

    let channel = interaction.guild.channels.cache.get(ch)

    if (!channel) {
      return interaction.reply({ content: `${client.emoji.cross} Channel Id Provided Was Incorrect`, ephemeral: true});
    }
    client.db.set(`anlog_${interaction.guild.id}`, channel.id)

    interaction.update({embeds: [new client.emb().setAuthor({name: user.username, iconURL: user.displayAvatarURL({dynamic: true})}).desc(`Logs Channel Set: <#${channel.id}>\n\n**You will need to select a punishment type in the next step**`).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setTimestamp()], components: [logsdn, nextlogs]})
    
    
    }
  }



    if (interaction.isStringSelectMenu()) {
 

    };
               
  

    
  })
}