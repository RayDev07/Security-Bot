module.exports = {
  name: 'staff',
  aliases: ['official', 'officials', 'worker'],
  category: 'Extra',
  description: "Give Customroles to User",
  args: false,
  usage: 'staff <user>',
  botPerms: [],
  userPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    let reqrole = await client.db.get(`reqrole_${message.guild.id}`)

    if (!message.member.permissions.has('ManageRoles') && !message.member.roles.cache.has(reqrole)) {
      return message.channel.send({embeds: [ new client.emb().desc(`${client.emoji.cross} ${message.author}: You need the **required role** or **Manage Roles** permission to do so`)]})
    }

    let user_id =
      message.mentions.members.first()?.user.id ||
      args[0]?.replace(/[^0-9]/g, '');

    let role_id = await client.db.get(`staff_${message.guild.id}`)

    let [member, role] = await Promise.all([
      user_id ? message.guild.members.fetch(user_id).catch((err) => {}) : null,
      role_id ? message.guild.roles.fetch(role_id).catch((err) => {}) : null,
    ]);


    if (!member) return client.emit(`invalidUser`, message);
    if (!role_id || !role) {
      return message.channel.send({embeds: [new client.emb().title(client.emoji.cross + ` Role Not Found!`).desc(`**Possible Reasons:**\n• Role Not Set\n• Role Deleted`)]})
    }

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

        if (!member.roles.cache.has(role.id)) {
      let x = await member.roles.add(role).catch((error) => {
        console.log(error)
        return false;
      });
      if (x) {
        return message.channel.send({
          embeds: [
            new client.emb()
              
              .desc(`${client.emoji.tick} ${message.author}: **Added** ${role} to ${member.user.tag}`)
          ],
        });
      }
      return;
    }

    let x = await member.roles.remove(role).catch((error) => {
      console.log(error)
      return false;
    });
    if (x) {
      return message.channel.send({
        embeds: [
          new client.emb()
      
            .desc(`${client.emoji.tick} ${message.author}: **Removed** ${role} from ${member.user.tag}`)
        
        
        ],
      })
    }
    


    

  }
}