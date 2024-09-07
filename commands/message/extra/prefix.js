/** @format */

module.exports = {
  name: 'prefix',
  aliases: ['setprefix'],
  category: 'Extra',
  description: 'Change the bot prefix',
  args: true,
  usage: 'prefix <new prefix / reset>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,
  vote: true,

  execute: async (client, message, args, prefix) => {

    
    
    if(!args[0]) {
      return message.channel.send(`${client.emoji.ham} The current prefix is \`${prefix}\``)
    }


    if (args[0] === 'clear' || args[0] === 'reset') {
      await client.db.set(`prefix_${message.guild.id}`, "-");
      let description = `Set the prefix to- \`-\``;
      let e = new client.emb().desc(
        `${client.emoji.tick} ${message.author}: ${description}`,
      );
      return message.channel.send({ embeds: [e] });
    }
    else {
    await client.db.set(`prefix_${message.guild.id}`, args[0]);
    let description = `Set the prefix to- \`${args[0]}\``;
    let e = new client.emb().desc(`${client.emoji.tick} ${message.author}: ${description}`);
    return message.channel.send({ embeds: [e] })
    }
  }
}