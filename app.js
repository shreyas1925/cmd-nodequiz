#!/usr/bin/env node

import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

// console.log(chalk.bgBlue("Hello Shreyas"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A JavaScript Master? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY ? ')} 
    Answer all the questions 🚀 I'm watching you 😱
    If you get any question wrong ${chalk.bgRed('game over')}
    Good luck ${playerName} ✌️
  `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Great work ${playerName}. That's a right answer` });
    } else {
        spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n new JavaScript Master`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `JavaScript: Don't judge me by my bad parts, learn the good stuff and stick with that!`
            )
        );
        process.exit(0);
    });
}


// Run it with top-level await
console.clear();
await welcome();
await askName();
winner();
