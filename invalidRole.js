module.exports = (client) => {
  client.on('invalidRole', async (message, msg) => {
    await msg?.delete();
    let description = `You didn't provide a valid role`;
    emb = new client.emb().desc(`${client.emoji.cross} ${message.author}: ${description}`);

    return message.reply({ embeds: [emb] });
  });
};