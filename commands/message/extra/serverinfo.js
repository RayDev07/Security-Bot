const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const moment = require("moment")


module.exports = {
  name: 'serverinfo',
  aliases: ['si'],
  category: 'Extra',
  description: "Get information about the server",
  args: false,
  usage: 'serverinfo',
  botPerms: [],
  userPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {

const guild = message.guild;
    
const filter = {
  0: 'None',
  1: 'Members without a role',
  2: 'All Members'
}

const verificationLevels = {
  0: "None",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Very High"
}
const booster = {
  0: '**Level** : 0',
  1: '**Level** : 1',
  2: '**Level** : 2',
  3: '**Level** : 3'
}

const upload = {
  0: '8:00 MB',
  1: '8:00 MB',
  2: '50:00 MB',
  3: '100:00 MB'
}

const nsfw = {
  0: 'Default',
  1: 'Safe',
  2: 'Explicit',
  3: 'Age Restricted'
}
const disabled = client.emoji.cross
const enabled = client.emoji.tick

    const notilevel = {
      0: 'All Messages',
      1: 'Only @mentions'
    }

      let a = new client.button().secondary('home', 'General Info', client.emoji.home)
    let adis = new client.button().secondary('home', 'General Info', client.emoji.home, true)
    let b = new client.button().secondary('features', 'Guild Features', client.emoji.utility)
    let bdis = new client.button().secondary('features', 'Guild Features', client.emoji.utility, true)
    let c = new client.button().secondary('roles', 'Roles Info', client.emoji.reason)
    let cdis = new client.button().secondary('roles', 'Roles Info', client.emoji.reason, true)
    let d = new client.button().secondary('others', 'Other Info', '<a:link:1281620132875210863>')
    let ddis = new client.button().secondary('others', 'Other Info', '<a:link:1281620132875210863>', true)

    let mainrow = new ActionRowBuilder().addComponents(adis,b,c,d)
    let feadis = new ActionRowBuilder().addComponents(a,bdis,c,d)
    let roledis = new ActionRowBuilder().addComponents(a,b,cdis,d)
    let othdis = new ActionRowBuilder().addComponents(a,b,c,ddis)
    let alldis = new ActionRowBuilder().addComponents(adis,bdis,cdis,ddis)

    let features = '';

    if(guild.features.includes('ANIMATED_BANNER')) features += `\n ${client.emoji.tick} : Antimated Banner`;
        if(guild.features.includes('ANTIMATED_ICON')) features += `\n${client.emoji.tick} : Animated Icon`;
        if(guild.features.includes('APPLICATION_COMMAND_PERMISSIONS_V2')) features += `\n${client.emoji.tick} : Application Commands Permissions V2`;
        if(guild.features.includes('BANNER')) features += `\n${client.emoji.tick} : Banner`;
        if(guild.features.includes('AUTO_MODERATION')) features += `\n${client.emoji.tick} : Auto Moderation`;
        if(guild.features.includes('COMMUNITY')) features += `\n${client.emoji.tick} : Community`;
        if(guild.features.includes('DEVELOPER_SUPPORT_SERVER')) features += `\n${client.emoji.tick} : Developer Support Server`;
    if(guild.features.includes('DISCOVERABLE')) features += `\n${client.emoji.tick} : Discoverable`;
        if(guild.features.includes('FEATURABLE')) features += `\n${client.emoji.tick} : Featurable`;
        if(guild.features.includes('INVITES_DISABLED')) features += `\n${client.emoji.tick} : Invites Disabled`;
        if(guild.features.includes('INVITE_SPLASH')) features += `\n${client.emoji.tick} : Invite Splash`;
        if(guild.features.includes('MEMBER_VERIFICATION_GATE_ENABLED')) features += `\n${client.emoji.tick} : Member Verification Gate Enabled`;
        if(guild.features.includes('MONETIZATION_ENABLED')) features += `\n${client.emoji.tick} : Monetization Enabled`;
        if(guild.features.includes('MORE_STCIKERS')) features += `\n${client.emoji.tick} : More Stickers`;
        if(guild.features.includes('NEWS')) features += `\n${client.emoji.tick} : News`;
    if(guild.features.includes('PARTNERED')) features += `\n${client.emoji.tick} : Partnered`;
        if(guild.features.includes('PREVIEW_ENABLED')) features += `\n${client.emoji.tick} : Preview Enabled`;
        if(guild.features.includes('ROLE_ICONS')) features += `\n${client.emoji.tick} : Role Icons`;
        if(guild.features.includes('TICKETED_EVENTS_ENABLED')) features += `\n${client.emoji.tick} : Ticketed Events Enabled`;
        if(guild.features.includes('VANITY_URL')) features += `\n${client.emoji.tick} : Vanity URL`;
        if(guild.features.includes('VERIFIED')) features += `\n${client.emoji.tick} : Verified`;
        if(guild.features.includes('VIP_REGIONS')) features += `\n${client.emoji.tick} : Vip Regions`;
        if(guild.features.includes('WELCOME_SCREEN_ENABLED')) features += `\n${client.emoji.tick} : Welcome Screen Enabled`;
    if(features === '') features += `\nNo features`;

    let feature = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
    .setTimestamp()
                                 .setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields({name: '__Guild Features__', value: `${features}`})
    

      const { createdTimestamp, ownerId , description} = guild;
      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
              return days + (days == 1 ? " day" : " days") + " ago";
      };
      const roles = guild.roles.cache.filter(x => x.managed != true)
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)
      let rolesdisplay;
      if (roles.length < 24) {
        rolesdisplay = roles.join(' ')
        if (roles.length < 1) rolesdisplay = "None"
      } else {
        rolesdisplay = `\`Too many roles to show..\``
      }
      if (rolesdisplay.length > 1024) {
        rolesdisplay = `${roles.slice(4).join(" ")} \`more..\`` } 
          

    
      

    let roleem = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
    .setTimestamp()
                                 .setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields({
      name: `__Roles Info__ \`[${roles.length}]\``,
      value: `${rolesdisplay}`
    })

    
      const members = guild.members.cache
      const channels = guild.channels.cache
      const emojis = guild.emojis.cache
    let rules = guild.rulesChannelId ? `<#${guild.rulesChannelId}>` : "None"

    let othinf = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
    .setTimestamp()
                                 .setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields([
      {
        name: `__Other Info__`,
        value: `Extra Information About the Guild`
      },
      {
        name: `__Channels__`,
        value: `**Total** : ${channels.size}\n**Category** : ${channels.filter(x => x.type === 4).size}\n**Text** : ${channels.filter(x => x.type === 0).size}\n**Voice** : ${channels.filter(x => x.type === 2).size}\n**Announcment** : ${channels.filter(x => x.type === 5).size}\n**Stage** : ${channels.filter(x => x.type === 13).size}\n**Forum** : ${channels.filter(x => x.type === 15).size}\n**Rules Channel** : ${rules}`
      },
      {
        name: `__Boosts__`,
        value: `${booster[guild.premiumTier]} [${guild.premiumSubscriptionCount} Boosts]\n**Vanity?** : ${guild.vanityURLCode ? `.gg/` + guild.vanityURLCode : client.emoji.cross }\n**Vanity Uses** : ${guild.vanityURLUses ? guild.vanityURLUses : client.emoji.cross }`
      },
      {
        name: `__Emojis__`,
        value: `**Total** : ${emojis.size}\n**Regular** : ${emojis.filter(x => !x.animated).size}\n**Animated** : ${emojis.filter(x => x.animated).size}`
      }
    ])

    await guild.bans.fetch()
    
      let data = guild.bannerURL
    
         let si = new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({name: guild.name, iconURL: guild.iconURL({dynamic: true})})
         // .setTitle(guild.name)
          .setDescription(guild.description ? guild.description : "No Description Set")
          .setThumbnail(guild.iconURL({ dynamic: true }))
           
      if (data) { si.setImage(guild.bannerURL({size: 4096})) 
                }
          si.addFields([
            {
              name: '__About Server__',
              value: `**Name** : ${guild.name} \n**Id** : ${guild.id} \n**Owner <a:x_owners:1241429570306183202>** : <@!${guild.ownerId}>\n**Created** : <t:${parseInt(createdTimestamp / 1000)}:R>\n**Members** : ${guild.memberCount}\n**Banned** : ${guild.bans.cache.size}`
            },
            {
              name: '__Extras__',
              value: `**Verification Level** : ${verificationLevels[guild.verificationLevel]}\n**Upload Limit** : ${upload[guild.premiumTier]}\n**Inactive Channel** : ${guild.afkChannelId ? `<#${guild.afkChannelId}>` : `None`}\n**Inactive Timeout** : ${guild.afkTimeout/60} mins\n**System Messages Channel** : ${guild.systemChannelId ? `<#${guild.systemChannelId}>` : `None`}\n**Default Notifications** : ${notilevel[guild.defaultMessageNotifications]}\n**Explicit Media Content Filter** : ${filter[guild.explicitContentFilter]}\n**NSFW Level** : ${nsfw[guild.nsfwLevel]}\n**2FA Requirement** : ${guild.mfaLevel ? enabled : disabled}\n**Boost Bar Enabled** : ${guild.premiumProgressBarEnabled ? enabled : disabled}`
            }
        
          ])                           
          .setTimestamp()
                                 .setFooter({text: `Requested By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      let serverinfo = await message.channel.send({embeds: [si], components: [mainrow]})



    


        const collector = await serverinfo.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });


    collector.on('collect', async (interaction) => {

      if (interaction.isButton()) {

        if (interaction.customId === "home") {
          return interaction.update({embeds: [si], components: [mainrow]})
        }

        if (interaction.customId === "roles") {
          return interaction.update({embeds: [roleem], components: [roledis]})
        }
        
        if (interaction.customId === `features`) {
            return interaction.update({ embeds: [feature], components: [feadis] })
        }
        if (interaction.customId === `others`) {
          return interaction.update({embeds: [othinf], components: [othdis]})
        }
        
      }      
    })



    collector.on('end', async () => {
      if(serverinfo) {
        serverinfo.edit({embeds: [si], components: [alldis] }).catch(() => { })
      }
    });

    

  }
}