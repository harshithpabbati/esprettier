#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const eslint = require('../lib/eslint');
const prettier = require('../lib/prettier');

console.log(chalk.green(figlet.textSync('One Lint', { horizontalLayout: 'full' })));
program
  .version('0.0.1')
  .description('An easy way to add eslint and prettier in your project')
console.log(chalk.yellowBright('Tada! An easy way to add eslint and prettier in your project.\n'));

program
    .command('prettier')
    .alias('p')
    .description('Add Prettier')
    .action(function () {
        prettier();
    });

program
    .command('eslint')
    .alias('e')
    .description('Add ESLint')
    .action(function () {
        eslint();
    });

program
    .command('prettier+eslint')
    .alias('p+e')
    .description('Add Prettier & ESLint')
    .action(function () {
        prettier();
        eslint();
    });

program.parse(process.argv);