import { mailSender } from "./mailSender.js";
import readline from 'readline';
import gradient from 'gradient-string';
import rl from './readlineInstance.js';

const consoleColors = {
    blue: ['#199cff', '#0600ba'], 
    green: ['#00ffee', '#00ff62'], 
    nitral: ['#c4e6ff', '#b3b1b1'], 
    red: ['#cf0808', '#630000'], 
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc'] 
};


const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const starter = async () => {
    const from = await askQuestion(gradient(consoleColors.blue).multiline("Введите имя отправителя: "));
    const to = await askQuestion(gradient(consoleColors.blue).multiline("Введите email получателя: "));
    const subject = await askQuestion(gradient(consoleColors.blue).multiline("Введите тему письма: "));
    const text = await askQuestion(gradient(consoleColors.blue).multiline("Введите текст письма: "));
    const countInput = await askQuestion(gradient(consoleColors.blue).multiline("Введите количество отправок (целое число): "));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
        console.log(gradient(consoleColors.red).multiline("Ошибка: Некорректный email получателя!"));
        starter();
        return;
    }

    const count = parseInt(countInput);
    if (isNaN(count) || count <= 0) {
        console.log(gradient(consoleColors.red).multiline("Ошибка: Количество отправок должно быть положительным числом!"));
        starter();
        return;
    }

    if(!from || !subject || !text) {
        console.log(gradient(consoleColors.red).multiline("Ошибка: Поля не могут быть пустыми!"));
        starter();
        return;
    }
    
    mailSender(from, to, subject, text, count);
}

export const mailSenderStarter = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 \n"));
    console.log(gradient(consoleColors.rainbow).multiline("Mail sender, подготовка!\n"));
    starter();

}