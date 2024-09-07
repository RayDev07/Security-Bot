const { ActionRowBuilder } = require('discord.js');

module.exports = (client) => {
  client.on('blUser', async (message, msg) => {
    await msg?.delete();

    let em = new client.emb().setColor(client.color).setAuthor({name : `Blacklisted`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setDescription(`${client.emoji.cross} You have been blacklisted from using my commands.\nGet to our [support server](${client.support}) to check the reason and its solution`).setThumbnail(message.author.displayAvatarURL({dynamic : true}));
            let b1 = new ActionRowBuilder().addComponents(new client.button().link(`Support`, client.support))
            return message.channel.send({embeds : [em] , components : [b1]}).catch((err) => {})
    

  });
}