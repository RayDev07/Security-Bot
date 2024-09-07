/** @format */

const { WebhookClient, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = (client) => {
  client.on('guildCreate', async (guild) => {
    client.db.set(`prefix_${guild.id}`, client.prefix)
    client.db.set(`wlUser_${guild.id}`, [])
    client.db.set(`exown_${guild.id}`, [])
    client.db.set(`wlRole_${guild.id}`, [])
    client.db.set(`setup_${guild.id}`, false)

    client.logger.log(
      ` Added to : ${guild.name} | ${guild.memberCount}`,
      'guild',
    );

    let mCh;
        await guild.channels.cache.forEach((channel) => {
            if(channel.type === 0) {
                mCh = channel;
            }
        }); 
        if(!mCh) return;
    

      const ch = await client.channels.fetch("1225441956331524116")

      const invite = await mCh.createInvite({maxAge : 0 , reason : `I am creating this invite for security reasons`});
    

    let own = await guild?.fetchOwner();
    
            const emb = new client.emb().desc("Added To A New Server!").setThumbnail(client.user.displayAvatarURL({dynmaic : true})).setTimestamp().setAuthor({name : `CodeX` , iconURL : guild.iconURL({dynmaic : true})}).addFields([
                {name : `Server Name` , value : `**\`${guild.name}\`**`},
                {name : `Server Owner` , value : `**\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown User"}\`**`},
                {name : `Server Members` , value : `**\`${guild.memberCount}\`**`},
              {
                name: `Cluster Stats **[${guild.shardId}]**`,
                value: `**\`${client.guilds.cache.size} Guilds\`** | **\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount,0,)} Users\`**`
              }
                ])
    
            ch.send({embeds : [emb], components: [new ActionRowBuilder().addComponents([new client.button().link(`Server Invite`, `https://discord.gg/${invite.code}`)])]});

    /*if (guild.memberCount < 100) {
      let e = new client.emb().desc(
        'Leaving guild because members less than 100',
      );
      try {
        let owner = await client.users.fetch(guild.ownerId);
        owner.send({ embeds: [e] });
      } catch (e) {}
      return guild.leave();
    }

    try {
      let owner = await client.users.fetch(guild.ownerId);
    } catch (e) {}*/
  })
}