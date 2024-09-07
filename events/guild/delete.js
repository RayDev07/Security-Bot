/** @format */

const { WebhookClient } = require('discord.js')

module.exports = (client) => {
  client.on('guildDelete', async (guild) => {
    if (!guild.name) return;
    client.logger.log(`Left : ${guild.name} | ${guild.memberCount}`, 'guild');

    client.db.delete(`prefix_${guild.id}`)
    client.db.delete(`wlUser_${guild.id}`)
    client.db.delete(`exown_${guild.id}`)
    client.db.delete(`wlRole_${guild.id}`)
    

          const web = new WebhookClient({url : client.web_join})

    let own = await guild?.fetchOwner();
    
            const emb = new client.emb().desc("Removed From A Server!").setThumbnail(client.user.displayAvatarURL({dynmaic : true})).setTimestamp().setAuthor({name : `CodeX` , iconURL : guild.iconURL({dynmaic : true})}).addFields([
                {name : `Server Name` , value : `**\`${guild.name}\`**`},
                {name : `Server Owner` , value : `**\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown User"}\`**`},
                {name : `Server Members` , value : `**\`${guild.memberCount}\`**`},
              {
                name: `Cluster Stats **[${guild.shardId}]**`,
                value: `**\`${client.guilds.cache.size} Guilds\`** | **\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount,0,)} Users\`**`
              }
                ])

    web.send({embeds: [emb]})
    
      
  });
};
