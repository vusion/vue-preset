const cp = require('child_process');
console.log(process.cwd());
module.exports = (api, options, rootOptions) => {
    console.log(options, rootOptions);
    api.onCreateComplete(() => {
        cp.spawn('npm', `create vusion ${options.templateType} ${rootOptions.projectName} -f`.split(' '), {
            cwd: process.cwd(),
            stdio: 'inherit',
        });
    });
};