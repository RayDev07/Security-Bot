/** @format */
const { EmbedBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
  name: 'list',
  description: 'list things in a server',
  category: 'Extra',
  args: true,
  usage: 'list <category>',
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    //code



await message.guild.members.fetch()
    let y = message.guild.members.cache
await message.guild.roles.fetch()
    
    
    const cat = args[0]


    msg = await message.channel.send({embeds: [new client.emb().desc(`${client.emoji.loading} Processing Command... Please Wait`)]}) 

    if (cat === `bot` || cat === `bots`) {
      

      let list = y.filter((x) => x.user.bot)


      let idk = list.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.id}]\``)

          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Bots in ${message.guild.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
        }
      
      
    } else {


    if (cat === `admin` || cat === `admins` || cat === `administrators`) {

            let list = y.filter((x) => x.permissions.has(`Administrator`))

      let idk = list.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.id}]\``)

          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Admins in ${message.guild.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
    }

      
    } else {
    

    if (cat === `inrole`) {
    
      let role_id = message.mentions.roles.first()?.id || args[1]?.replace(/[^0-9]/g, '')

    let role = await message.guild.roles.cache.get(role_id)

      if(!role) {
        return client.emit(`invalidRole`, message)
      }

    

      if (role.members.size == 0) {
        return msg.edit({content:`There are no users in the provided role`, embeds: []})
      }

      let idk = role.members.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.id}]\``)

          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Members in ${role.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
    }
      
    } else {

      if (cat === `ban` || cat === `bans`) {

      let list = await message.guild.bans.fetch()

        if (list.size == 0) {
         msg.edit({content: `There are no banned users here`, embeds: []})
        }

      let idk = list.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.user.id}]\``)


          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Bans in ${message.guild.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
    }        

      
      } else { 
        
        if (cat === `roles`) {

          const list = message.guild.roles.cache.filter(r => r.id !== message.guild.id).sort((a, b) => b.position - a.position)
        
          let idk = list.map((m) => `${m.toString()} | \`[Id: ${m.id}]\` - ${m.members.size} Members`)


          const mapping = (require("lodash")).chunk(idk, 9);//9     

      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Roles in ${message.guild.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
    }          
        
      } else {
          
          if (cat === `mods` || cat === `mod` || cat === `moderators`) {


            let list = y.filter((x) => x.permissions.has(`KickMembers` || `BanMembers` || `ManageServer` || `ManageMessages`))

      let idk = list.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.id}]\``)

          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Mods in ${message.guild.name}`);
      pages.push(embed);
             
    }

      if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
    }

            
            
          } else {
            
        msg.edit({embeds: [new client.emb().addFields([{name: `\`${prefix}list\``, value:`\`${prefix}list roles\`\nList the roles in the server\n\n\`${prefix}list bots\`\nList the bots in the server\n\n\`${prefix}list admins\`\nList the admins in the server\n\n\`${prefix}list mods\`\nList the mods in the server\n\n\`${prefix}list inrole\`\nList the members in a specific role\n\n\`${prefix}list bans\`\nList the bans in the server`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
    }
      }
     }
      
    }
          }
        }

    

  }
}

async function pagi(channel, author, pages, timeout = 30000 * 4) {
    if (!channel || !pages || pages.length === 0) return;

  const r = new ActionRowBuilder().addComponents(
      new channel.client.button().secondary(`back_${author.id}`, ``, channel.client.emoji.backarr),
      new channel.client.button().success(`home_${author.id}`, ``, channel.client.emoji.home),
      new channel.client.button().secondary(`next_${author.id}`, ``, channel.client.emoji.arrow),
      new channel.client.button().danger(`end_${author.id}`, ``, channel.client.emoji.delete)
    );
    let page = 0;

    const curPage = await msg.edit({ embeds: [pages[page].setFooter({text: `Page • 1/${pages.length}`})], components: [r]});
    
    const collector = curPage.createMessageComponentCollector({
        filter: (interaction) => {
        if (author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${channel.client.emoji.cross} Only **${author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: timeout,
      idle: timeout / 2
    });

    collector.on('collect', async(i) => {
              await i.deferUpdate();

      switch (i.customId) {
        case `home_${author.id}`:
          page = 0
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case `back_${author.id}`:
          page = page > 0 ? --page : pages.length - 1;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case `next_${author.id}`:
          page = page + 1 < pages.length ? ++page : 0;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case `end_${author.id}`:
          await curPage.delete().catch(() => { });
          break;
      }
    });

    collector.on('end', () => {
      if (curPage) {
        curPage.edit({comoponents: []})
      }
    })
}



