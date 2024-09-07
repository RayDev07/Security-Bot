/** @format */

const { EmbedBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
  name: 'vclist',
  category: 'voice',
  aliases: ["vlist"],
  description: 'List the member in voice',
  args: true,
  usage: 'vclist',
  userPerms: [],
  botPerms: [],
  owner: false,
  execute: async (client, message, args, prefix) => {

    if (!message.member.voice.channel) {
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.cross} ${message.author}: You aren't connected to a voice channel`)]})
    }


    msg = await message.channel.send({embeds: [new client.emb().desc(`${client.emoji.loading} Processing Command... Please Wait`)]}) 
    
    await message.guild.members.fetch()
    y = message.guild.members.cache
    
      let list = y.filter((x) => x.voice?.channel?.id == message.member?.voice?.channel?.id)


      let idk = list.map((m) => `\`${m.user.tag}\` | \`[Id: ${m.id}]\``)

          const mapping = (require("lodash")).chunk(idk, 9);//9     


      
    const descriptions = mapping.map((s) => s.join("\n"))

      

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
      .setTitle(`List of Members in ${message.member.voice.channel.name}`);
      pages.push(embed);
             
    }

    if (pages.length === 1) {
      return msg.edit({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

      pagi(message.channel, message.author, pages)
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
