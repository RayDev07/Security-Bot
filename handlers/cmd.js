/** @format */

const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client) => {
  let count = 0;

  const commandFiles = readdirSync(
    path.join(__dirname, '../commands/message'),
    { withFileTypes: true },
  )
    .filter((dirent) => dirent.isDirectory())
    .flatMap((dirent) =>
      readdirSync(path.join(__dirname, `../commands/message/${dirent.name}`))
        .filter((file) => file.endsWith('.js'))
        .map((file) => ({
          name: file.split('.js')[0],
          file: path.join(
            __dirname,
            `../commands/message/${dirent.name}/${file}`,
          ),
        })),
    );

  for (const { name, file } of commandFiles) {
    const command = require(file);
    if (command.name) {
      client.commands.set(command.name, command);
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => {
          client.aliases.set(alias, command);
        });
      }
      count++;
    }
  }

  client.logger.log(`Loaded ${count} commands.`, 'comnd');
};
