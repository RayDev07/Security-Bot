/** @format */

const logger = require('./utils/plugins/logger.js');
const { token } = require('./configuration/config.js');
const { ClusterManager } = require('discord-hybrid-sharding');

const manager = new ClusterManager('./index.js', {
  totalShards: 'auto',
// shardsPerClusters: 1,
  mode: 'process',
  token: token,
  respawn: true,
  restarts: {
    max: 5,
    interval: 10000,
  },
});

manager.on('debug', (x) => logger.log(x, 'shard'))

manager.spawn({ timeout: -1 });
