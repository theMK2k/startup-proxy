const { exit } = require("process");
const util = require("util");
const child_process = require("child_process");
const path = require("path");

const logger = require("loglevel");

const config = require("./config");

logger.log('config:', config);

if (!config.args || config.args.length == 0) {
  logger.error('startup-proxy ERROR: no arguments provided, abort!');
  exit(1);
}

const argsAnalysis = [];

for (let i = 0; i < config.args.length; i++) {
  const argItem = {
    arg: config.args[i],
    enabled: true
  }

  config.rules.forEach(rule => {
    const rx = new RegExp(rule.rx);
    if (rx.test(argItem.arg)) {
      if (rule.action === "remove-arg") {
        argItem.enabled = false;
      }

      // TODO: implement other rules, e.g. "remove-arg-and-previous", "remove-arg-and-next"
    }
  });

  argsAnalysis.push(argItem);
}

logger.log('startup-proxy: argsAnalysis:', argsAnalysis);

const targetArgs = argsAnalysis.filter(item => item.enabled).map(item => item.arg);

logger.log('targetArgs:', targetArgs);

child_process.spawn(path.join(config.cwd, config["main-executable"]), targetArgs);