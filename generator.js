const cp = require('child_process');
const path = require('path');
module.exports = (api, options, rootOptions) => {
    api.onCreateComplete(() => {
        console.log('install cloud-admin ...');
        const create = cp.spawn('npm', `create vusion cloud-admin-lite ${rootOptions.projectName} -f`.split(' '), {
            cwd: process.cwd(),
        });
        create.on('close', (code) => {
            if (code !== 0) {
                console.error('npm create vusion exited with code' + code);
                return;
            }
            console.log('install cloud-admin dependencies ...');
            cp.spawn(api.generator.pm || 'npm', ['install'], {
                cwd: path.join(process.cwd(), rootOptions.projectName),
            });
        });
    });
};