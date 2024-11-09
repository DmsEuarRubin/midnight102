import nodemailer from "nodemailer";
import readline from 'readline';
import gradient from 'gradient-string';
import { loadMenu } from './loadMenu.js'
const consoleColors = {
    blue: ['#199cff', '#0600ba'],
    green: ['#00ffee', '#00ff62'],
    nitral: ['#c4e6ff', '#b3b1b1'],
    red: ['#cf0808', '#630000'],
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc']
};
const accounts = [
    {
        user: 'dmseuar1@gmail.com',
        pass: 'lvdukrqtjqpcaxdy',
        service: 'gmail'
    },
    {
        user: 'dmseuar2@gmail.com',
        pass: 'vgmodplnjlvoiyqr',
        service: 'gmail'
    },
    {
        user: 'dmseuar1@mail.ru',
        pass: '9VbkBNhx1wmnzj3WiFQh',
        service: 'mail.ru'
    },
    {
        user: 'dmseuar2@mail.ru',
        pass: 'fEWbLZhs00qJvuMePcyg',
        service: 'mail.ru'
    },
    {
        user: 'dmseuar3@mail.ru',
        pass: 'gqrJ23rqzMrtTqRezYeE',
        service: 'mail.ru'
    },
    {
        user: 'dmseuar4@mail.ru',
        pass: 'FbGujzbKPMKJreEaNDdQ',
        service: 'mail.ru'
    },
    {
        user: 'dmseuar5@mail.ru',
        pass: '3aD9yEbMsmMt6g0TCb3s',
        service: 'mail.ru'
    },
    {
        user: 'dmseuar6@mail.ru',
        pass: 'B5uWZHQcjFGLj5uHFg7J',
        service: 'mail.ru'
    }
]
const send = (from, to, subject, text) => {
    return new Promise((resolve, reject) => {
        const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];

        const transporter = nodemailer.createTransport({
            service: randomAccount.service,
            auth: {
                user: randomAccount.user,
                pass: randomAccount.pass
            }
        });

        const mailOptions = {
            from: `"${from}" <${randomAccount.user}>`,
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(gradient(consoleColors.red).multiline("Ошибка отправки письма, ждите!"));
                return reject(error);
            }
            console.log(gradient(consoleColors.green).multiline("Письмо успешно отправлено!"));
            resolve(info);
        });
    });
};
export const mailSender = async (from, to, subject, text, count) => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 \n"));
    console.log(gradient(consoleColors.rainbow).multiline("Mail sender запущен!\n"));

    for (let i = 0; i < count; i++) {
        try {
            await send(from, to, subject, text); // Ждем завершения отправки каждого письма
        } catch (error) {
            console.log(gradient(consoleColors.red).multiline(`Попытка ${i + 1} не удалась, повторная отправка...`));
            i--;
        }
    }

    console.log(gradient(consoleColors.nitral).multiline("\nИнструмент завершил свою работу: Возвращение в главное меню..."));
    setTimeout(() => {
        loadMenu(); 
    }, 4000);
}