const translate = require('@iamtraction/google-translate');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'translate',
  aliases: ['tl'],
  category: 'extra',
  description: 'Translate a query to english',
  args: false,
  usage: 'translate <query>',
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    let query = null;

    if (args[0]) query = args.join(' ');
    if (!query) {
      try {
        let ref = await message.fetchReference();
        query = ref.content;
      } catch (e) {
        query = null;
      }
    }


    let lang = {
      en: `English`,
      fr: `French`,
      fi: `Finnish`,
      el: `Greek`,
      gu: `Gujarati`,
      hi: `Hindi`,
      it: `Italian`,
      ja: `Japanese`,
      la: `Latin`,
      es: `Spanish`
    }
        
    

    if (query != null) {
    
     // let result = await translate(query, { to: 'en' });
     // let e = new client.emb().desc(`\`\`\`\n${result.text}\`\`\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})

      row = new StringSelectMenuBuilder()
      .setCustomId('tl')
      .setPlaceholder('Select a Language to Translate')
    
      .addOptions([
      {
        label: `English`,
        value: `en`
      },
      {
        label: `Finnish`,
        value: `fi`
      },
      {
        label: `French`, 
        value: `fr`
      },
      {
        label: `Greek`, 
        value: `el`
      },
      {
        label: `Gujarati`,
        value: `gu` 
      },
      {
        label: `Hindi`,
        value: `hi`
      },
      {
        label: `Italian`,
        value: `it` 
      },
      {
        label: `Japanese`,
        value: `ja`
      },
      {
        label: `Latin`,
        value: `la` 
      },
      {
        label: `Spanish`,
        value: `es`
      },      
      ])
      
      
     tl = await message.channel.send({ embeds: [new client.emb().desc(`\`\`\`\nTranslating: ${query}\`\`\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `Powered by Google Translator`})], components: [new ActionRowBuilder().addComponents(row)] })
  

     const collector = await tl.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} This menu can't be controlled by you`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });


    collector.on('collect', async (interaction) => {

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === `tl`) {
        
        for (const value of interaction.values) {

          let result = await translate(query, { to: value })
        return interaction.update({embeds: [new client.emb().desc(`\`\`\`\n${lang[value]}: ${result.text}\`\`\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setFooter({text: `Powered by Google Translator`})], components: []})
      }
     }
    }
  })

      } else {

          return message.channel.send(`Missing queries to translate`);
        }
    
  }
}