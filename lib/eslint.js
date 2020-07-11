const chalk = require('chalk');
const nrc = require('node-run-cmd');
const fs = require('fs');
const eslintConfig = require('./config/eslint.json');

module.exports = function() {
    nrc.run('npm install eslint --save-dev').then(() => {
        json = JSON.stringify(eslintConfig, null, 4);
        fs.writeFile('.eslintrc', json, 'utf8', (err) => {
            if (err) throw err;
        });
        fs.writeFile('.eslintignore', "node_modules/", 'utf8', (err) => {
            if (err) throw err;
        });
        fs.readFile('package.json', 'utf8', function(err, pkg) {
            if (err) throw err;
            let content = JSON.parse(pkg);
            let scripts = content.scripts;
            scripts["lint"] = "eslint .";
            scripts["lint:fix"] = "eslint --fix .";
            content.scripts = scripts;
            fs.writeFile('package.json', JSON.stringify(content, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log(chalk.yellowBright('Successfully added ESLint in your project'));
            });
        });
    });
};