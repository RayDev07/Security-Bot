const { PermissionsBitField, AuditLogEvent } = require('discord.js');


module.exports = async(client) => {

client.on("roleDelete", async role => {
  if (!role.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return;

  let logs = await role.guild.fetchAuditLogs({type: AuditLogEvent.RoleDelete}).then(x => x.entries.first())
  let set = await client.db.get(`setup_${role.guild.id}`)
            if(logs && set === true){
            if(logs.executor.id === client.user.id) return;
            if(logs.executor.id === role.guild.ownerId) return;
            let wlU = await client.db.get(`wlUser_${role.guild.id}`) ? await client.db.get(`wlUser_${role.guild.id}`) : []         
             let own = await client.db.get(`exown_${role.guild.id}`) ? await client.db.get(`exown_${role.guild.id}`) : []
            let wlR = await client.db.get(`wlRole_${role.guild.id}`)
            let wlisted = await role.guild.roles.fetch(wlR).catch(() => {})
            if (wlU.includes(logs.executor.id)) return;
              if (own.includes(logs.executor.id)) return;
           let mem = await role.guild.members.fetch(logs.executor.id).catch(() => {})
            if (mem.roles.cache.has(wlisted)) return;
              let punish = await client.db.get(`punish_${role.guild.id}`) 
              
   let del = await role.guild.roles.create({
     name: role.name,
     color: role.color,
     permissions: role.permissions,
     position: role.position
   })
              if (punish == `none`) return;
              if (punish == `ban`) {             
                let logch = await client.db.get(`anlog_${role.guild.id}`) 
                let ch = await role.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;
                let x = await role.guild.members.ban(logs.executor.id, {reason: `CodeX Antinuke | Role Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {
                
                ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Ban Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})
                }

                if (x) {


                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Banned From ${role.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Role Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Ban Successful` : `${client.emoji.cross} Ban Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})


                  
                }
              }
              if (punish == `kick`) {
                let logch = await client.db.get(`anlog_${role.guild.id}`) 
                let ch = await role.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;
                let x = await role.guild.members.kick(logs.executor.id, {reason: `CodeX Antinuke | Role Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Kick Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})
                  
                } 
                if(x) {


                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Kicked From ${role.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Role Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Kick Successful` : `${client.emoji.cross} Kick Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})

                  
                  
                }                
              }

              if (punish == `mute`) {
                let dur = await client.db.get(`muteDur_${role.guild.id}`)
                let logch = await client.db.get(`anlog_${role.guild.id}`) 
                let ch = await role.guild.channels.fetch(logch).catch(() => {})
                if (!ch || ch === null) return;

                let mem = role.guild.members.cache.get(logs.executor.id)
                let x = await mem.timeout(dur, {reason: `CodeX Antinuke | Role Deleted Not Whitelisted`}).catch(() => {})

                if (!x) {

                ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${client.emoji.cross} Mute Unsuccessful\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})
                }
                if (x) {

                  logs.executor.send({embeds: [ new client.emb().title(`Antinuke Triggered`).desc(`**You were Muted in ${role.guild.name}**\n${client.emoji.ham} **Reason:** CodeX Antinuke | Role Deleted Not Whitelisted\n${client.emoji.ham} **Moderator:** ${client.user.username}`).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]}).catch(() => {})

                  ch.send({embeds: [new client.emb().title(`Antinuke Result:`).desc(`**Trigger**: Role Deleted\n**Criminal**: ${logs.executor.tag}\n\n**Action Taken?**: ${x ? `${client.emoji.tick} Mute Successful` : `${client.emoji.cross} Mute Unsuccessful` }\n**Recovery**: ${del ? client.emoji.tick : client.smoji.cross}`).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()}).setTimestamp().setFooter({text: `CodeX Antinuke`, iconURL: role.guild.iconURL({dynamic: true})})]})
                  
                }                
              }
              
        
              
            }  
}) 
}