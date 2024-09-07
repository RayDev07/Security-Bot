/** @format */

module.exports = {
  name: 'steal',
  category: 'moderation',
  description: 'steal a emojis',
  args: false,
  usage: 'steal <emoji (id/url) >',
  userPerms: ['ManageEmojisAndStickers'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {

  

   let ref;
    if (message?.reference) ref = await message?.fetchReference();

    if (ref?.content?.match(/\/emojis\/(\d+)/) || message?.content?.match(/\/emojis\/(\d+)/)) {

      let id = await ref?.content?.match(/\/emojis\/(\d+)/) || message?.content?.match(/\/emojis\/(\d+)/);

          try {
      const newEmoji = await message.guild.emojis.create({
        attachment: `https://cdn.discordapp.com/emojis/${id[1]}.gif`,
        name: `stolen_emoji`,
      });
      return message.channel.send(`${client.emoji.tick} Successfully Added Emoji(s) : <a:${newEmoji.name}:${newEmoji.id}>`);
    } catch (error) {
      try {
        const newEmoji = await message.guild.emojis.create({
          attachment: `https://cdn.discordapp.com/emojis/${id[1]}.png`,
          name: `stolen_emoji`,
        });
        return message.channel.send(`${client.emoji.tick} Successfully Added Emoji(s) : <:${newEmoji.name}:${newEmoji.id}>`);
      } catch (error) {
        return message.channel.send({embeds: [ new client.emb().desc(`\`\`\`\n${error}\`\`\``)]});
      }
    }

      
    }
    
            if (!args) return message.reply({ content: `${client.emoji.cross} No emojis provided!` });
    
        const emojiargs = args.join("");
        let animemojis = emojiargs.match(/[a][:]([A-Za-z0-9_~])+[:]\d{15,}/g) || ref?.content?.match(/[a][:]([A-Za-z0-9_~])+[:]\d{15,}/g);
        let normemojis = emojiargs.match(/[^a][:]([A-Za-z0-9_~])+[:]\d{15,}/g) || ref?.content?.match(/[^a][:]([A-Za-z0-9_~])+[:]\d{15,}/g);
        let desc = `${client.emoji.tick} Successfully Added Emoji(s) : `;  
      
      if (!normemojis && !animemojis) return message.reply({ content: `${client.emoji.cross} No emojis provided!` });
      
          if (animemojis && normemojis) {
            if (animemojis.length + normemojis.length > 20) {
                return message.reply({
                    content: `You cannot more than add 20 emojis!`,
                });
            }
        }

        if (animemojis) {
            if (animemojis.length > 20) {
                return message.reply({
                    content: `You cannot more than add 20 emojis!`,
                });
            }
            try {
            for (let aemoji in animemojis) {
                const list = animemojis[aemoji].split(":");
                const Url = `https://cdn.discordapp.com/emojis/${list[2]}.gif`;
                await message.guild.emojis
                    .create({ attachment: Url, name: list[1] })
                    .then(
                        (emoji) => (desc += `<a:${emoji.name}:${emoji.id}> `)
                    );
            }
           } catch(e) {

              return message.reply({embeds: [new client.emb().desc(`\`\`\`\n${e}\`\`\``)]})

              }
        }

        if (normemojis) {
            if (normemojis.length > 20) {
                return message.reply({
                    content: `You cannot more than add 20 emojis!`,
                });
            }
            try {
            for (let emojis in normemojis) {
                const list = normemojis[emojis].split(":");
                const Url = `https://cdn.discordapp.com/emojis/${list[2]}.png`;
                await message.guild.emojis
                    .create({ attachment: Url, name: list[1] })
                    .then((emoji) => (desc += `<:${emoji.name}:${emoji.id}> `));
            }
          } catch(e) {
             return message.reply({embeds: [new client.emb().desc(`\`\`\`\n${e}\`\`\``)]})
              }
        }  
      
      message.reply(desc)
    /*const id =
      content?.match(/<:[^:]+:(\d+)>/) ||
      content?.match(/<a:[^:]+:(\d+)>/) ||
      content?.match(/\/emojis\/(\d+)/) ||
      content.split(' ') || ref.content?.match(/<:[^:]+:(\d+)>/) ||
      ref.content?.match(/<a:[^:]+:(\d+)>/) ||
      ref.content?.match(/\/emojis\/(\d+)/) ||
      ref.content.split(' ');

  if (!id) {
      try {
        let ref = await message?.fetchReference();
        id = ref.content?.match(/<:[^:]+:(\d+)>/) ||
      ref.content?.match(/<a:[^:]+:(\d+)>/) ||
      ref.content?.match(/\/emojis\/(\d+)/) ||
      ref.content.split(' ');
      } catch (e) {}
    }*/

   /* try {
      const newEmoji = await guild.emojis.create({
        attachment: `https://cdn.discordapp.com/emojis/${id[1]}.gif`,
        name: `stolen_emoji`,
      });
      channel.send(`${client.emoji.tick} Added the emoji <a:${newEmoji.name}:${newEmoji.id}>`);
    } catch (error) {
      try {
        const newEmoji = await guild.emojis.create({
          attachment: `https://cdn.discordapp.com/emojis/${id[1]}.png`,
          name: `stolen_emoji`,
        });
        channel.send(`${client.emoji.tick} Added the emoji <:${newEmoji.name}:${newEmoji.id}>`);
      } catch (error) {
        channel.send({embeds: [ new client.emb().desc(`Couldn't add emoji\n${error}`)]});
      }
    }*/
  },
};