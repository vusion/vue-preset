const cp = require('child_process');
const path = require('path');
module.exports = (api, options, rootOptions) => {
    api.onCreateComplete(() => {
        const create = cp.spawn('npm', `create vusion cloud-admin-lite ${rootOptions.projectName} -f`.split(' '), {
            cwd: process.cwd(),
        });
        create.on('close', (code) => {
            if (code !== 0) {
                console.error('npm create vusion exited with code' + code);
                return;
            }
            cp.spawn(api.generator.pm || 'npm', ['install'], {
                cwd: path.join(process.cwd(), rootOptions.projectName),
                stdio: 'inherit',
            });
        });
    });
};