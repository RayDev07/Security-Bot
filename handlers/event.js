/** @format */

const { readdirSync } = require('fs');
const path = require('path');

module.exports = async (client) => {
  let count = 0;

  const loadEvents = (dir) => {
    const events = readdirSync(path.join(__dirname, `../events/${dir}`))
      .filter((file) => file.endsWith('.js'))
      .map((file) => ({
        name: file.split('.js')[0],
        file: path.join(__dirname, `../events/${dir}/${file}`),
      }));

    for (const { name, file } of events) {
      require(file)(client);
      client.events.set(count++, name);
    }
  };

  const eventDirs = readdirSync('./events');
  for (const dir of eventDirs) {
    loadEvents(dir);
  }

  client.logger.log(`Loaded ${count} events`, 'event');
};
