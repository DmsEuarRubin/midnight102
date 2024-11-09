import { nodePortScanner } from './node-port-scanner.js';
import readline from 'readline';
import gradient from 'gradient-string';
import { loadMenu } from './loadMenu.js';
import { portScanner } from './portScanner.js';
import dns from 'dns';
const consoleColors = {
    blue: ['#199cff', '#0600ba'],
    green: ['#00ffee', '#00ff62'],
    nitral: ['#c4e6ff', '#b3b1b1'],
    red: ['#cf0808', '#630000'],
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc']
};


const checkURLAvailability = (URL) => {
    return new Promise((resolve) => {
        dns.resolve(URL, (err) => {
            if (err) resolve(false);
            else resolve(true);
        });
    });
};

export const startPortScanner = async (URL) => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 \n"));

    const isURLAvailable = await checkURLAvailability(URL);
    if (!isURLAvailable) {
        console.log(gradient(consoleColors.red).multiline('\nОшибка: Указанный IP или URL недоступен, попробуйте другой...'));
        setTimeout(() => {
            portScanner();
        }, 3000);
        return;
    }

    const loadingMessage = `\x1b[32mПроверка портов...\x1b[0m`;
    const loadingSymbol = ['|', '/', '-', '\\'];

    let index = 0;
    const loadingAnimation = setInterval(() => {
        process.stdout.write(`\r${loadingMessage} \x1b[32m${loadingSymbol[index]}\x1b[0m`);
        index = (index + 1) % loadingSymbol.length;
    }, 100);

    nodePortScanner(URL, [80, 23, 443, 21, 22, 25, 3389, 110, 445, 139, 143, 53, 135, 3306, 8080, 1723, 111, 995, 993, 5900, 1025, 587, 8888, 199, 1720, 465, 548, 113, 81, 6001, 10000, 514, 5060, 179, 1026, 2000, 8443, 8000, 32768, 554, 26, 1433, 49152, 2001, 515, 8008, 49154, 1027, 5666, 646, 5000, 5631, 631, 49153, 8081, 2049, 88, 79, 5800, 106, 2121, 1110, 49155, 6000, 513, 990, 5357, 427, 49156, 543, 544, 5101, 144, 7, 389, 8009, 3128, 444, 9999, 5009, 7070, 5190, 3000, 5432, 1900, 3986, 13, 1029, 9, 5051, 6646, 49157, 1028, 873, 1755, 2717, 4899, 9100, 119, 37, 1000])
        .then(results => {
            clearInterval(loadingAnimation);
            console.log(gradient(consoleColors.green).multiline(`\nОткрытые порты: ${results}`));
            console.log(gradient(consoleColors.nitral).multiline("\nИнструмент завершил свою работу: Возвращение в главное меню..."));
            setTimeout(() => {
                loadMenu(); 
            }, 10000);
        })
        .catch(error => {
            clearInterval(loadingAnimation);
            console.log(gradient(consoleColors.red).multiline('\nНе удалось получить открытые порты...'));
        });
}