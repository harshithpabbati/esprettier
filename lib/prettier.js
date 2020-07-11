const chalk = require('chalk');
const nrc = require('node-run-cmd');
const fs = require('fs');
const prettierConfig = require('./config/prettier.json');

module.exports = function() {
    nrc.run('npm install prettier --save-dev').then(() => {
        json = JSON.stringify(prettierConfig, null, 4);
        fs.writeFile('.prettierrc', json, 'utf8', (err) => {
            if (err) throw err;
        });
        fs.writeFile('.prettierignore', "node_modules/", 'utf8', (err) => {
            if (err) throw err;
        });
        fs.readFile('package.json', 'utf8', function(err, pkg) {
            if (err) throw err;
            let content = JSON.parse(pkg);
            let scripts = content.scripts;
            scripts["format"] = "prettier --write \"**/*.+(js|jsx|json)\""
            content.scripts = scripts;
            fs.writeFile('package.json', JSON.stringify(content, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log(chalk.yellowBright('Successfully added Prettier in your project'));
            });
        });
    });
};
