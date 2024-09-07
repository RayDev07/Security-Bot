/** @format */

    module.exports = (client) => {
  process.on('uncaughtException', (err) => {
    client.logger.log('uncaught exception', 'error');
    console.log(err);
  });

  process.on('unhandledRejection', (err) => {
    client.logger.log('unhandled rejection', 'error');
    console.log(err);
  });

  process.on('error', (err) => {
    client.logger.log('error', 'error');
    console.log(err);
  });

  client.logger.log(`Loaded Anti-Crash`, `noerr`);
};
