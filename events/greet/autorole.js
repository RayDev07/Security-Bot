module.exports = (client) => {
  client.on('guildMemberAdd', async(member) => {

    
    if (member.user.bot == false) {
    
    let arh = await client.db.get(`arh_${member.guild.id}`) 

    if (!arh || arh == null) return;

    if (arh.length == 0) {
      return;
    }
    
    
      arh.forEach((rid) => {
      const role = member.guild.roles.cache.find((r) => r.id === rid)
        
      if (role) {
        member.roles.add(role, reason="NiSi™ | Human Autoroles")  
      }
    })
        
    } else {

      if (member.user.bot == true) {

    let arb = await client.db.get(`arb_${member.guild.id}`) 

    
    if (!arb || arb == null) return;
    
    if (arb.length == 0) {
      return;
    }

        
      arb.forEach((rid) => {
      const role = member.guild.roles.cache.find((r) => r.id === rid);
      if (role) {
        member.roles.add(role, reason="NiSi™| Bot Autoroles")
      }
    });
    } 
    
  }
    
  })
}