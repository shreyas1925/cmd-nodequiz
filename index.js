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
    figlet(`Congrats , ${playerName} !\n you are the new JavaScript Master`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `JavaScript: Don't judge me by my bad parts, learn the good stuff and stick with that!`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JSX stands for?\n',
        choices: [
            'Javascript Source Example',
            'Javascript Simple Extender',
            'JavaScript XML',
            'Javascript Extended XML',
        ],
    });

    return handleAnswer(answers.question_1 === 'JavaScript XML');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What type of DOM does Reactjs uses\n',
        choices: ['Open-source DOM', 'Virtual DOM', 'Real DOM', 'React DOM'],
    });
    return handleAnswer(answers.question_2 === 'Virtual DOM');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `Reactjs is built by ?\n`,
        choices: ['Walmart', 'Flipkart', 'Facebook', 'Google'],
    });

    return handleAnswer(answers.question_3 === 'Facebook');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Which of the following is NOT a primitive type?\n',
        choices: [
            'boolean',
            'number',
            'null',
            'object',
        ],
    });
    return handleAnswer(answers.question_4 === 'object');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message:
            'Which is the last phase of React component’s lifecycle\n',
        choices: ['Mounting Phase', 'Updating Phase', 'Final rendering phase', 'Unmounting Phase'],
    });

    return handleAnswer(answers.question_5 === 'Unmounting Phase');
}


// Run it with top-level await
console.clear();
await welcome();
await askName();
// questions start
await question1();
await question2();
await question3();
await question4();
await question5();
// questions end
winner();
