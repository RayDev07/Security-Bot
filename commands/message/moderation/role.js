/** @format */

const {ActionRowBuilder} = require('discord.js');

module.exports = {
  name: 'role',
  category: 'moderation',
  description: 'assign or remove roles from a user',
  args: true,
  usage: 'role <member> <role>',
  userPerms: ['ManageRoles'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => { 
    // Code


      let role_id = message.mentions.roles.first()?.id || args[1]?.replace(/[^0-9]/g, '') || message.guild.roles.cache.find((r) => r.name == args.slice(1).join(' '))?.id;
    let user_id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '');

    
    let [member, role] = await Promise.all([
      user_id ? message.guild.members.fetch(user_id).catch((err) => {}) : null,
      role_id ? message.guild.roles.fetch(role_id).catch((err) => {}) : null,
      ]);

    if (!member) return client.emit(`invalidUser`, message);
    if (!role_id || !role) return client.emit(`invalidRole`, message);   


    
if (member.id === client.user.id)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: I can't assign roles to myself`,
          ),
        ],
      });

    if (member.id === message.guild.ownerId)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't assign roles to the guild owner`,
          ),
        ],
      });

    if (message.member.roles.highest.position <= member.roles.highest.position &&
      message.member.id != message.guild.ownerId)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't do that due to role hierarchy`,
          ),
        ],
      });

    if (
      message.member.roles.highest.position <= role.position &&
      message.member.id != message.guild.ownerId
    )
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

    if (message.guild.members.me.roles.highest.position <= role.position)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      });




    if (!member.roles.cache.has(role.id)) {
      let x = await member.roles.add(role).catch((error) => {
        message.channel.send({
          embeds: [
            new client.emb()
              .setTitle(`**Role Failed :**`)
              .desc(`${client.emoji.ham} **Reason**: ${error}`),
          ],
        });
        return false;
      });
      if (x) {
        return message.channel.send({
          embeds: [
            new client.emb()
              .desc(`${client.emoji.tick} ${message.author}: **Added** ${role} to ${member.user.tag}`)]
        });
      }
      return;
    }

    let x = await member.roles.remove(role).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`Role Failed:`)
            .desc(`${client.emoji.ham} **Reason**: ${error}`),
        ],
      });
      return false;
    });
    if (x) {
      return message.channel.send({
        embeds: [
          new client.emb()
            .desc(`${client.emoji.tick} ${message.author}: **Removed** ${role} from ${member.user.tag}`)]
      });
  }
    

    
  }
}