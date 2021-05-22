const process = require('process')
const path = require('path')
const logger = require('loglevel')

const cwd = path.parse(process.execPath).dir;

const jsonConfigPath = path.join(cwd, 'startup-proxy.json');

const jsonConfig = require(jsonConfigPath);

if (jsonConfig["enable-logging"]) {
  logger.setLevel(0);
} else {
  logger.setLevel(4);
}

const config = jsonConfig;

config.args = process.argv.slice(2);
config.cwd = cwd;

module.exports = config
