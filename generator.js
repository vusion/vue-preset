const cp = require('child_process');
console.log(process.cwd());
module.exports = (api, options, rootOptions) => {
    console.log(options, rootOptions);
    api.onCreateComplete(() => {
        const create = cp.spawn('npm', `create vusion ${options.templateType} ${rootOptions.projectName} -f`.split(' '), {
            cwd: process.cwd(),
            stdio: 'inherit',
        });
        create.on('close', (code) => {
            if (code !== 0) {
              console.log(`ps process exited with code ${code}`);
            }
            cp.spawn('npm', `i`.split(' '), {
                cwd: process.cwd(),
                stdio: 'inherit',
            });
        });
    });
};