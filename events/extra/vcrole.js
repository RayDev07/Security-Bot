module.exports = (client) => {
  client.on('voiceStateUpdate', async(oldState, newState) => {


  let member = await newState.guild.members.fetch(newState.id, {force: true})

    
  
    if (!oldState.channelId && newState.channelId) {
    
    
    if (member.user.bot == false) {
    
    let vrh = await client.db.get(`vrh_${newState.guild.id}`) 

    if (!vrh || vrh == null) return;

    if (vrh.length == 0) {
      return;
    }
    
    
      vrh.forEach((rid) => {
      const role = newState.guild.roles.cache.find((r) => r.id === rid)
        
      if (role) {
        member.roles.add(role, reason="CodeX Vcroles | Joined Vc")  
      }
    })
        
    } else {

      if (member.user.bot == true) {

    let vrb = await client.db.get(`vrb_${newState.guild.id}`) 

    
    if (!vrb || vrb == null) return;
    
    if (vrb.length == 0) {
      return;
    }

        
      vrb.forEach((rid) => {
      const role = newState.guild.roles.cache.find((r) => r.id === rid);
      if (role) {
        member.roles.add(role, reason="CodeX Vcroles | Joined Vc")
      }
    });
    } 
    
  }

   } else {

    if (oldState.channelId && !newState.channelId) {

    if (member.user.bot == false) {
    
    let vrh = await client.db.get(`vrh_${newState.guild.id}`) 

    if (!vrh || vrh == null) return;

    if (vrh.length == 0) {
      return;
    }
    
    
      vrh.forEach((rid) => {
      const role = newState.guild.roles.cache.find((r) => r.id === rid)
        
      if (role) {
        member.roles.remove(role, reason="CodeX Vcroles | Left Vc")  
      }
    })
        
    } else {

      if (member.user.bot == true) {

    let vrb = await client.db.get(`vrb_${newState.guild.id}`) 

    
    if (!vrb || vrb == null) return;
    
    if (vrb.length == 0) {
      return;
    }

        
      vrb.forEach((rid) => {
      const role = newState.guild.roles.cache.find((r) => r.id === rid);
      if (role) {
        member.roles.remove(role, reason="CodeX Vcroles | Left Vc")
      }
    });
    } 

      
    } 

          
    }
  }   
    
  })
      }