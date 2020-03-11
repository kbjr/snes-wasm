
const { exec, env } = require('./utils/exec');

exec('mocha', [ '--config', 'spec/.mocharc.js' ], {
	env: env({
		TS_NODE_FILES: 'true'
	})
});
