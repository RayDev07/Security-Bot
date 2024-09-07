/** @format */
const { StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'information',
  description: "shows the bot's help menu",
  args: false,
  usage: '',
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    if (args[0]) {
      cmd = await client.commands.get(args[0]) || client.aliases.get(args[0])

      str = cmd.category.toLowerCase().split(' ')
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
      
      let lemo = new EmbedBuilder()
        .setAuthor({ name: str.join(' '), iconURL: client.user.displayAvatarURL() })
        .setFooter({text: `Note- <> means required, [] means optional`})
        .setColor(client.color)
      if (cmd.description) {
        lemo.setDescription(`> ${cmd.description}`)
      } else {
        lemo.setDescription("> None")
      }
      if (cmd.aliases && cmd.aliases != []) {
        let lemao = cmd.aliases.join(' | ') || `None`
        lemo.addFields({name: "Aliases",value: `${lemao}`})
      }
      if (cmd.usage) {
        lemo.addFields({name: "Usage", value: `\`${prefix}${cmd.usage}\``})
      } else {
        lemo.addFields({name: "Usage", value: "None"})
      }

      return message.channel.send({ embeds: [lemo] })
    }

    home = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('home')
      .setEmoji(client.emoji.home)

    del = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('delete')
      .setEmoji(client.emoji.delete)

    allcmd = new ButtonBuilder()
      .setStyle('Secondary')
      .setLabel('All Commands')
      .setCustomId('allcmd')
      .setEmoji(client.emoji.cmd)


    del1 = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('delete')
      .setEmoji(client.emoji.delete)
      .setDisabled(true)



    home1 = new ButtonBuilder()
      .setStyle('Secondary')
      .setCustomId('home')
      .setEmoji(client.emoji.home)
      .setDisabled(true)


    allcmd1 = new ButtonBuilder()
      .setStyle('Secondary')
      .setLabel('All Commands')
      .setCustomId('allcmd')
      .setEmoji(client.emoji.cmd)
      .setDisabled(true)


    let dismenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Choose a Category')
        .setDisabled(true)
        .setCustomId('row')
        .addOptions([
          {
            label: `Antinuke`,
            emoji: client.emoji.antinuke,
            value: `h1`
          },
          {
            label: `Moderation`,
            emoji: client.emoji.mod,
            value: `h2`
          },
          {
            label: `Extra`,
            emoji: client.emoji.utility,
            value: `h3`
          }
        ])
    )



    let menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setPlaceholder('Choose a Category')
        .setCustomId('row')
   
        .addOptions([
          {
            label: `Antinuke`,
            emoji: client.emoji.antinuke,
            value: `h1`
          },
          {
            label: `Moderation`,
            emoji: client.emoji.mod,
            value: `h2`
          },
          {
            label: `Welcomer`,
            emoji: client.emoji.greet,
            value: `greet`
          },
          {
            label: `Voice`,
            emoji: client.emoji.vc,
            value: `vc`
          },
          {
            label: `Media`,
            emoji: client.emoji.media,
            value: `media`
          },
          {
            label: `Extra`,
            emoji: client.emoji.utility,
            value: `h4`
          }
        ])
    )


    //--------------------------//     

    const enall = new ActionRowBuilder().addComponents(home, del, allcmd)

    const homedis = new ActionRowBuilder().addComponents(home1, del, allcmd)

    const cmddis = new ActionRowBuilder().addComponents(home, del, allcmd1)

    const alldis = new ActionRowBuilder().addComponents(home1, del1, allcmd1)

    //-----------------------------//

    let pfx = await client.db.get(`prefix_${message.guild.id}`)
    
    let em = new EmbedBuilder()
      .setColor(client.color)
      //.setThumbnail(client.user.displayAvatarURL())
      .setFooter({text: `Commands: 142`, iconURL: client.user.displayAvatarURL()})
      .setTimestamp()
      .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTitle("Help Menu & Support Panel")
      .setFooter({text: `Total Commands 142`})
    .setDescription(`\n\`${pfx}help <command>\` - Get help on a specific command.\n\`\`\`css\n<> - Required Argument\n[] - Optional Argument\`\`\``)
      .addFields([{
        name: '<a:x_diamonds:1241429811256365096>__**Modules**__', value: `> ${client.emoji.antinuke} **[Antinuke](https://dsc.gg/codexdev)**\n> ${client.emoji.mod} **[Moderation](https://dsc.gg/codexdev)**\n> ${client.emoji.greet} **[Welcomer](https://dsc.gg/codexdev)**\n> ${client.emoji.vc} **[Voice](https://dsc.gg/codexdev)**\n> ${client.emoji.media} **[Media](https://dsc.gg/codexdev)**\n> ${client.emoji.utility} **[Extra](https://dsc.gg/codexdev)**`
                  },
                  {
                    name: `<a:link:1281620132875210863> __**Links**__`,
                    value: `[Invite](${client.invite}) | [Support](${client.support}) | [Vote](${client.vote}) | [Website](https://dsc.gg/codexdev)`
                  }
                 ])
    let help = await message.channel.send({ embeds: [em], components: [homedis, menu] })
    //----------------------------//

    let embed1 = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Antinuke__`, value: `\`antinuke\`, \`antinuke setup\`, \`antinuke enable\`, \`antinuke disable\`, \`antinuke log\`, \`whitelist\`, \`whitelist role\`, \`whitelist role add\`, \`whitelist role remove\`, \`whitelist role show\`, \`whitelist show\`, \`whitelist reset\`, \`punishment\`, \`punishment set\`, \`punishment reset\`, \`extraowner\`, \`extraowner add\`,  \`extraowner remove\`, \`extraowner show\`, \`extraowner reset\`` }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let aumod = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Automod__`, value: "`automod`, `automod config`, `automod log`, `automod whitelist add`, `automod whitelist remove`, `automod whitelist show`, `automod whitelist reset`, `antiinvite enable`, `antiinvite disable`, `antilink enable`, `antilink disable`, `anticaps enable`, `anticaps disable`, `antispam enable`, `antispam disable`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    
    let embed2 = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Moderation__`, value: "`snipe`, `steal`, `purge`, `purge bots`, `purge humans`, `purge images`, `purge files`, `nuke`, `roleicon`, `role`, `ban`, `unban`, `unbanall`, `kick`, `mute`, `unmute`, `pruneinvites`, `hide`, `hideall`, `lock`, `lockall`, `unhide`, `unhideall`, `unlock`, `unlockall`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    

    let embed3 = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Giveaways__`, value: `\`gstart\`, \`gend\`, \`greroll\`, \`gpause\`, \`gresume\``}).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let wlc = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Welcomer__`, value: "`autorole`, `autorole humans`, `autorole humans add`, `autorole humans remove`, `autorole bots`, `autorole bots add`, `autorole bots remove`, `autorole show`, `autorole reset`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let vc = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Voice__`, value: "`vcmute`, `vcunmute`, `vckick`, `vcdeafen`, `vcundeafen`, `vclist`, `vcrole`, `vcrole humans`, `vcrole humans add`, `vcrole humans remove`, `vcrole bots`, `vcrole bots add`, `vcrole bots remove`, `vcrole show`, `vcrole reset`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let med = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Media__`, value: "`media`, `media setup`, `media remove`, `media show`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
        
    let embed4 = new EmbedBuilder().setColor(`#2f3136`).addFields({ name: `__Extra__`, value: "`afk`, `avatar`, `banner`, `banner server`, `banner user`, `botinfo`, `invite`, `support`, `vote`, `membercount`, `ping`, `prefix`, `profile`, `translate`, `serverinfo`, `statistics`, `userinfo`, `ignore`, `ignore config`, `ignore channel`, `ignore command`, `list`, `list roles`, `list bots`, `list inrole`, `list admins`, `list mods`, `list bans`, `rolesetup`, `rolesetup config`, `rolesetup reset`, `bot`, `staff`, `mod`, `admin`, `manager`, `owner`, `founder`, `vip`, `guest`, `artist`, `friend`, `girl`, `partner`" }).setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})

    let embed69 = new EmbedBuilder().setAuthor({name: `All Commands`, iconURL: client.user.displayAvatarURL()}).setColor(client.color).addFields([{ name: `${client.emoji.antinuke} __Antinuke__`, value: `\`antinuke\`, \`antinuke setup\`, \`antinuke enable\`, \`antinuke disable\`, \`antinuke log\`, \`whitelist\`, \`whitelist role\`, \`whitelist role add\`, \`whitelist role remove\`, \`whitelist role show\`, \`whitelist show\`, \`whitelist reset\`, \`punishment\`, \`punishment set\`, \`punishment reset\`, \`extraowner\`, \`extraowner add\`,  \`extraowner remove\`, \`extraowner show\`, \`extraowner reset\`` }, /*{name: `${client.emoji.automod} __Automod__`, value: "`automod`, `automod config`, `automod log`, `automod whitelist add`, `automod whitelist remove`, `automod whitelist show`, `automod whitelist reset`, `antiinvite enable`, `antiinvite disable`, `antilink enable`, `antilink disable`, `anticaps enable`, `anticaps disable`, `antispam enable`, `antispam disable`"},*/ { name: `${client.emoji.mod} __Moderation__`, value: "`snipe`, `steal`, `nickname`, `purge`, `purge bots`, `purge humans`, `purge images`, `purge files`, `nuke`, `roleicon`, `role`, `ban`, `unban`, `unbanall`, `kick`, `mute`, `unmute`, `pruneinvites`, `hide`, `hideall`, `lock`, `lockall`, `unhide`, `unhideall`, `unlock`, `unlockall`" }, {name: `${client.emoji.greet} __Welcomer__`, value: /*[`welcome`, `welcome channel`, `welcome message`, `welcome ping`, `welcome autodel`, `welcome embed`, `welcome reset`]*/ "`autorole`, `autorole humans`, `autorole humans add`, `autorole humans remove`, `autorole bots`, `autorole bots add`, `autorole bots remove`, `autorole show`, `autorole reset`"},/* { name: `${client.emoji.gw} __Giveaways__`, value: `\`gstart\`, \`gend\`, \`greroll\`, \`gpause\`, \`gresume\`` },/* {name: `${client.emoji.ticket} __Tickets__`, value: "`ticket setup`, `ticket config`, `ticket reset`"}, {name: `${client.emoji.venity} __Vanity Roles__`, value: "`vanityroles`, `vanityroles setup`, `vanityroles setvanity`, `vanityroles reset`"},*/ {name: `${client.emoji.vc} __Voice__`, value: "`vcmute`, `vcunmute`, `vckick`, `vcdeafen`, `vcundeafen`, `vclist`, `vcrole`, `vcrole humans`, `vcrole humans add`, `vcrole humans remove`, `vcrole bots`, `vcrole bots add`, `vcrole bots remove`, `vcrole show`, `vcrole reset`"}, {name: `${client.emoji.media} __Media__`, value: "`media`, `media setup`, `media remove`, `media show`" }, { name: `${client.emoji.utility} __Extra__`, value: "`afk`, `avatar`, `banner`, `banner server`, `banner user`, `botinfo`, `invite`, `support`, `vote`, `membercount`, `ping`, `prefix`, `profile`, `translate`, `serverinfo`, `statistics`, `userinfo`, `ignore`, `ignore config`, `ignore channel`, `ignore command`, `list`, `list roles`, `list bots`, `list inrole`, `list admins`, `list mods`, `list bans`, `rolesetup`, `rolesetup config`, `rolesetup reset`, `bot`, `staff`, `mod`, `admin`, `manager`, `owner`, `founder`, `vip`, `guest`, `artist`, `friend`, `girl`, `partner`" }])




    //----------------------------//
    const collector = await help.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });
    //----------------------------//    

    collector.on('collect', async (interaction) => {
      if (interaction.isStringSelectMenu()) {
        for (const value of interaction.values) {
          if (value === `h1`) {
            return interaction.update({ embeds: [embed1], components: [enall, menu] })
          }
          if (value === `aumod`) {
            return interaction.update({ embeds: [aumod], components: [menu, enall] })
          }
          if (value === `h2`) {
            return interaction.update({ embeds: [embed2], components: [enall, menu] })
          }
          if (value === `greet`) {
      
            return interaction.update({embeds: [wlc], components: [enall, menu]})
          }
            if (value === `h3`) {
              return interaction.update({ embeds: [embed3], components: [enall, menu] })
            }
          if (value === `tick`) {
            return interaction.reply({content: `Coming Soon..!!`, ephemeral: true})
           /* return interaction.update({embeds: [ticket], components: [enall, menu]})*/
          }
          if (value === `venity`) {
            return interaction.update({embeds: [ven], components: [menu, enall]})
          }
          
          if (value === `vc`) {
              return interaction.update({embeds: [vc], components: [enall, menu]})
          }

          if (value === `media`) {
            return interaction.update({embeds: [med], components: [enall, menu]})
          }
          
          if (value === `game`) {
            return interaction.reply({content: `Coming Soon..!!`, ephemeral: true})
          }
            if (value === `h4`) {
              return interaction.update({ embeds: [embed4], components: [enall, menu] })
            }

          }
        }
        if (interaction.isButton()) {
          if (interaction.customId === `home`) {
            return interaction.update({ embeds: [em], components: [homedis, menu] })
          }
          if (interaction.customId === `delete`) {
            return interaction.message.delete().catch(() => { })
          }
          if (interaction.customId === `allcmd`) {
            return interaction.update({ embeds: [embed69], components: [cmddis, menu] })
          }


        }
    })

    //-----------------------------//
    collector.on('end', async () => {
      if(help) {
        help.edit({ embeds: [em], components: [alldis, dismenu] }).catch(() => { })
      }
    });
  }
}

    
