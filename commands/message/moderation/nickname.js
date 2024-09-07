module.exports = {

  name: 'nickname',
  aliases: ["nick", "setnick"],
  category: 'moderation',
  description: 'nicknames provided member',
  args: true,
  usage: 'nick <member> [nickname]',
  userPerms: ['ManageNicknames'],
  botPerms: ['Administrator'],
  owner: false,
  execute: async (client, message, args, prefix) => {
      
      let nick = args.slice(1).join(" ")
      
      let id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '')

    let member = id

      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})

      : null

    if (!member) { 

        return client.emit(`invalidUser`, message);

                 }
      
      if (member.id === client.user.id) {

      return message.channel.send({

        embeds: [

          new client.emb().desc(

            `${client.emoji.cross} ${message.author}: You can't nick me dumbo`,

          ),

        ]})

      }
      
      if (member.id === message.guild.ownerId) {

      return message.channel.send({

        embeds: [

          new client.emb().desc(

            `${client.emoji.cross} ${message.author}: You can't nick the server owner`,

          ),

        ]})

      }
      
      if (message.member.id != member.guild.ownerId && message.member.roles.highest.position < member.roles.highest.position && message.member.roles.highest.position == member.roles.highest.position)

      return message.channel.send({

        embeds: [

          new client.emb().desc(

            `${client.emoji.cross} ${message.author}: You can't do that due to role hierarchy`,

          ),

        ],

      });
      
      if (
      message.guild.members.resolve(client.user).roles.highest.position <=
      member.roles.highest.position
    )
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      });

    
      await member.setNickname(nick)
      return message.channel

      .send({

        embeds: [

          new client.emb().desc(

            `${client.emoji.tick} ${message.author}: Changed ${member.user.username}'s nick to ${nick}`,

          ),

        ],

      })
      
      
      
      
      
      
      }
    }