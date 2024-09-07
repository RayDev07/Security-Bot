const { PermissionsBitField, AuditLogEvent } = require('discord.js');


module.exports = async(client) => {

client.on("channelDelete", async channel => {

  if (!channel.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return;

  let logs = await channel.guild.fetchAuditLogs({type: AuditLogEvent.ChannelDelete}).then(x => x.entries.first())
  let set = await client.db.get(`setup_${channel.guild.id}`)
            if(logs && set === true){
            if(logs.executor.id === client.user.id) return;
            if(logs.executor.id === channel.guild.ownerId) return;
            let wlU = await client.db.get(`wlUser_${channel.guild.id}`) ? await client.db.get(`wlUser_${channel.guild.id}`) : []            
            let eo = await client.db.get(`exown_${channel.guild.id}`) ? await client.db.get(`exown_${channel.guild.id}`) : []
            let wlR = await client.db.get(`wlRole_${channel.guild.id}`)
            let wlisted = await channel.guild.roles.fetch(wlR).catch(() => {})
            if (wlU.includes(logs.executor.id)) return;
            if (eo.includes(logs.executor.id)) return;
              let mem = await channel.guild.members.fetch(logs.executor.id).catch(() => {})
            if (mem.roles.cache.has(wlisted)) return;
              let punish = await client.db.get(`punish_${channel.guild.id}`) 
              
   let del = await channel.clone().then(ch => ch.setPosition(channel.position)).catch(() => { });
              if (punish == `none`) return;
              if (punish == `ban`) {             
                let logch = await client.db.get(`anlog_${channel.guild.id}`) 
                let ch = await channel.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;
                let x = await channel.guild.members.ban(logs.executor.id, {reason: `CodeX Antinuke | Channel Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {
                
                ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Ban Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})
                }

                if (x) {


                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Banned From ${channel.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Channel Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Ban Successful` : `${client.emoji.cross} Ban Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})


                  
                }
              }
              if (punish == `kick`) {
                let logch = await client.db.get(`anlog_${channel.guild.id}`) 
                let ch = await channel.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;
                let x = await channel.guild.members.kick(logs.executor.id, {reason: `CodeX Antinuke | Channel Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Kick Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})
                  
                } 
                if(x) {


                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Kicked From ${channel.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Channel Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Kick Successful` : `${client.emoji.cross} Kick Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})

                  
                  
                }                
              }

              if (punish == `mute`) {
                let dur = await client.db.get(`muteDur_${channel.guild.id}`)
                let logch = await client.db.get(`anlog_${channel.guild.id}`) 
                let ch = await channel.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;

                let mem = channel.guild.members.cache.get(logs.executor.id)
                let x = await mem.timeout(dur, {reason: `CodeX Antinuke | Channel Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {

                ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Mute Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})
                }
                if (x) {

                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Muted in ${channel.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Channel Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Channel Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Mute Successful` : `${client.emoji.cross} Mute Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: channel.guild.iconURL({dynamic: true})})]})
                  
                }                
              }
              
        
              
            }  
}) 
}